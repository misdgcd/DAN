"use client";

import React, { use, useEffect, useState } from "react";
import Data from "../../Data/Data.json"
import SalesQoutation from "../SalesQoutation/SalesQoutation";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export default function SalesOrder() {

  const [tableData, setTableData] = useState([
    {
      itemCode: '',
      itemName: '',
      quantity: '',
      uom: '',
      uomConversion: '',
      location: '',
      inventoryStatus: '',
      sellingPriceBeforeDiscount: 0,
      discountRate: 0,
      sellingPriceAfterDiscount: 0,
      lowerBound: '',
      taxCode: '',
      taxCodePercentage: '',
      taxAmount: '',
      modeOfReleasing: '',
      scPwdDiscount: '',
      grossTotal: 0,
      selected: false,
    }
  ]);


  const handleInputChange = (rowIndex: any, fieldName: any, value: any) => {
    const newData: any = [...tableData];
    newData[rowIndex][fieldName] = value;
    console.log(value)
  };

  const onAddHeader = async () => {
      // const item = await axios.post(`${process.env.NEXT_PUBLIC_IP}/item`);
      // setAddItemModalALert(true);
      // console.log(item.data);
      // setOpen(false);
  };

  const handleAddRow = (rowIndex: any, fieldName: any) => {
    setTableData(prevData => [
      ...prevData,
      {
        itemCode: '',
        itemName: '',
        quantity: '',
        uom: '',
        uomConversion: '',
        location: '',
        inventoryStatus: '',
        sellingPriceBeforeDiscount: 0,
        discountRate: 0,
        sellingPriceAfterDiscount: 0,
        lowerBound: '',
        taxCode: '',
        taxCodePercentage: '',
        taxAmount: '',
        modeOfReleasing: '',
        scPwdDiscount: '',
        grossTotal: 0,
        selected: false,
      },
    ]);


    onAddHeader();


  };




  // Array Declarations

  const [customerData, setCustomerData] = useState([
    {
      customerCode: '00000',
      customerName: 'N/A',
      cusShipAddress: 'N/A',
      cusTIN: 'N/A'
    }
  ]);

  let customerData2 = [{}];

  let currentCustomerData = [
    {
      customerCode: 'C1001',
      customerName: 'John Doe',
      cusShipAddress: '123 Main Street, Cityville',
      cusTIN: '1234567890'
    },
    {
      customerCode: 'C1002',
      customerName: 'Jane Smith',
      cusShipAddress: '456 Oak Avenue, Townsville',
      cusTIN: '0987654321'
    },
    {
      customerCode: 'C1003',
      customerName: 'Alice Johnson',
      cusShipAddress: '789 Elm Road, Villageton',
      cusTIN: '1357924680'
    },
    {
      customerCode: 'C1004',
      customerName: 'Bob Anderson',
      cusShipAddress: '321 Cedar Lane, Hamletville',
      cusTIN: '2468013579'
    },
    {
      customerCode: 'C1005',
      customerName: 'Eva Garcia',
      cusShipAddress: '567 Pine Street, Suburbia',
      cusTIN: '9876543210'
    }
  ];


  
  // Search Table

  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = currentCustomerData.filter((rowData) => {
    return (
      Object.values(rowData).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });


  const addCustomerData = (id:any, name:any, address:any, tin:any) => {
    
    let newArray  = {
      customerCode: id,
      customerName: name,
      cusShipAddress: address,
      cusTIN: tin
    }

    setCustomerData([
      newArray
    ])
    
    console.log(customerData2)
    setShowCustomer(!showCustomer);

  }


  const [showWindow, setShowWindow] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);



  // Date Declarations

  const now = new Date();
  
  const manilaDate = now.toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });



  // CSS Declarations

  const [itemcodetextalign, setitemcodetextalign] = useState('');



  // Onclick Functions

  const toggleShowWindow = () => {
    setShowWindow(!showWindow);
  }

  const handleRemoveRow = (rowIndex: any) => {
    let emptyData = 
    {
      itemCode: '',
      itemName: '',
      quantity: '',
      uom: '',
      uomConversion: '',
      location: '',
      inventoryStatus: '',
      sellingPriceBeforeDiscount: '',
      discountRate: '',
      sellingPriceAfterDiscount: '',
      lowerBound: '',
      taxCode: '',
      taxCodePercentage: '',
      taxAmount: '',
      modeOfReleasing: '',
      scPwdDiscount: '',
      grossTotal: '',
      selected: false,
    }

    
    const newData: any = [...tableData];
    const newData2: any = newData[rowIndex]
    const newData3: any = newData[rowIndex] = emptyData;

    const latestTableData = tableData[rowIndex] = emptyData;

    const latestTableDataArr = tableData;

    console.log("1", newData2, "2", newData3, "tabledata", tableData)

    setTableData((prevData) => prevData.filter((_, index) => index !== rowIndex));

  };


  const handleShowDoc = () => {
    setShowDoc(!showDoc);
  }

  const handleShowCustomer = () => {
    setShowCustomer(!showCustomer);
  }

  const openConsole = () => {
    console.log('open sample');
  }


  // Open Item Table

  const [openItemTablePanel, setOpenItemTablePanel] = useState(false);
  const [openOUMPanel, setOpenOUMPanel] = useState(false);
  const [openLocationPanel, setOpenLocationPanel] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [totalAfterVat, settotalAfterVat] = useState(0);
  const [totalBeforeVat, setTotalBeforeVat] = useState(0);
  const [totalVat, setTotalVat] = useState(0);


  useEffect(()=>{

    let tempSum = 0;
    let tempSum2 = 0;

    const updatedTableData = [...tableData];
    // console.log('data', updatedTableData[0]['grossTotal'])

    let arrayLen = updatedTableData.length;
    
    for(let i=0; i<arrayLen; i++){
      tempSum = tempSum + (updatedTableData[i]['sellingPriceBeforeDiscount'] * updatedTableData[i]['quantity']);
      tempSum2 = tempSum2 + updatedTableData[i]['grossTotal'];
    }

    setTotalBeforeVat(localCurrency.format(tempSum))
    settotalAfterVat(localCurrency.format(tempSum2))
    setTotalVat(localCurrency.format(tempSum - tempSum2));

  });


  function sum(){

    let tempSum = 0;

    const updatedTableData = [...tableData];
    // console.log('data', updatedTableData[0]['grossTotal'])

    let arrayLen = updatedTableData.length;
    
    for(let i=0; i<arrayLen; i++){
      tempSum = tempSum + updatedTableData[i]['grossTotal']
    }

    console.log(tempSum);

  }

  sum();

  

  const openItemTable = (rowIndex: any) => {
    setOpenItemTablePanel(!openItemTablePanel);
    setSelectedRowIndex(rowIndex);
  }

  const openOUMTable = (rowIndex: any) => {
    setOpenOUMPanel(!openOUMPanel);
    setSelectedRowIndex(rowIndex);
  }

  const openLocationTable = (rowIndex: any) => {
    setOpenLocationPanel(!openLocationPanel);
    setSelectedRowIndex(rowIndex);
  }
  
  const handleItemClick = (item: any) => {
    if (selectedRowIndex !== null) {
      const updatedTableData = [...tableData];
      updatedTableData[selectedRowIndex] = {
        ...updatedTableData[selectedRowIndex],
        itemCode: item.itemCode,
        itemName: item.itemName,
        quantity: 1,
        discountRate: 0,
        sellingPriceBeforeDiscount: item.sellingPrice,
        sellingPriceAfterDiscount: item.sellingPrice,
        uom: 'Box',
        grossTotal: item.sellingPrice
        // Update other fields based on item data, e.g., price, tax, etc.
      };
      setTableData(updatedTableData);
      setShowItems(false);
      setSelectedRowIndex(null);
      setOpenItemTablePanel(!openItemTablePanel);
    }
  };

  const nones = () => {
    const newDataWTF = [...tableData];
    console.log(newDataWTF[0]['quantity'])
  }

  const itemdatalist = [
    { itemCode: '001', itemName: 'Sniper 155', sellingPrice: 10, taxCodePercentage: 5 },
    { itemCode: '002', itemName: 'Sniper 150', sellingPrice: 15, taxCodePercentage: 8 },
    { itemCode: '003', itemName: 'Pulsar 220F', sellingPrice: 12, taxCodePercentage: 6 },
    { itemCode: '004', itemName: 'Yamaha R15', sellingPrice: 18, taxCodePercentage: 7 },
    { itemCode: '005', itemName: 'Honda CB Unicorn', sellingPrice: 14, taxCodePercentage: 5 },
    { itemCode: '006', itemName: 'KTM Duke 200', sellingPrice: 20, taxCodePercentage: 9 },
    { itemCode: '007', itemName: 'Suzuki Gixxer SF', sellingPrice: 16, taxCodePercentage: 8 },
    { itemCode: '008', itemName: 'Royal Enfield Classic 350', sellingPrice: 22, taxCodePercentage: 7 },
    { itemCode: '009', itemName: 'Bajaj Dominar 400', sellingPrice: 25, taxCodePercentage: 6 },
    { itemCode: '010', itemName: 'TVS Apache RTR 160', sellingPrice: 13, taxCodePercentage: 5 },
    { itemCode: '011', itemName: 'Hero Xtreme 160R', sellingPrice: 15, taxCodePercentage: 6 },
    { itemCode: '012', itemName: 'Yamaha FZS FI V3', sellingPrice: 14, taxCodePercentage: 7 },
    { itemCode: '013', itemName: 'KTM RC 200', sellingPrice: 21, taxCodePercentage: 8 },
    { itemCode: '014', itemName: 'Honda Hornet 2.0', sellingPrice: 17, taxCodePercentage: 6 },
    { itemCode: '015', itemName: 'Suzuki Gixxer', sellingPrice: 16, taxCodePercentage: 5 },
    { itemCode: '016', itemName: 'Royal Enfield Himalayan', sellingPrice: 23, taxCodePercentage: 9 },
    { itemCode: '017', itemName: 'Bajaj Pulsar NS200', sellingPrice: 19, taxCodePercentage: 8 },
    { itemCode: '018', itemName: 'TVS Apache RR310', sellingPrice: 24, taxCodePercentage: 7 },
    { itemCode: '019', itemName: 'Hero Glamour', sellingPrice: 11, taxCodePercentage: 6 },
    { itemCode: '020', itemName: 'Yamaha MT-15', sellingPrice: 18, taxCodePercentage: 5 },
  ];

  const handleQuantityChange = (rowIndex: any, quantity: any) => {
    const updatedTableData = [...tableData];
    const item = updatedTableData[rowIndex];
    // Calculate amount based on quantity and price
    const discount = item.discountRate;
    const amount = quantity * item.sellingPriceBeforeDiscount;
    // Update quantity and gross total
    updatedTableData[rowIndex] = {
      ...item,
      quantity,
      grossTotal: quantity * item.sellingPriceAfterDiscount
      // Other calculations if needed
    };
    setTableData(updatedTableData);
  };

  const handleDiscountRateChange = (rowIndex: any, discountRates: any) => {
    const updatedTableData = [...tableData];
    const item = updatedTableData[rowIndex];
    // Calculate amount based on quantity and price
    const amount = ((discountRates/100) * item.sellingPriceBeforeDiscount);
    const finalAmount = item.sellingPriceBeforeDiscount - amount;
    // Update quantity and gross total
    updatedTableData[rowIndex] = {
      ...item,
      discountRate: discountRates,
      sellingPriceAfterDiscount: finalAmount,
      grossTotal: finalAmount * item.quantity,
      // Other calculations if needed
    };
    setTableData(updatedTableData);
  };

  let localCurrency = new Intl.NumberFormat("en-us", {
    currency: "PHP",
    style: "currency"
  })

  
  const handleSearchItem = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const filteredDataItem = itemdatalist.filter((rowData) => {
    return (
      Object.values(rowData).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }).slice(0, 10);




  return (
    <>
      <div className="salesbody p-2 text-sm rounded-md flex gap-40  container overflow-x-auto shadow-lg">
       
        <div className="w-[] flex flex-wrap gap-5 col1 mr-3">
          <div>
            <div className="grid grid-cols-2">
              <label htmlFor="entrynumber">Customer Code</label>
              <div>
                <input type="text" value={customerData.map((e)=>e.customerCode)} className="bg-slate-200" readOnly/> <button className="w-[20px]  bg-slate-200" onClick={handleShowCustomer}>=</button>
                  {
                    showCustomer && (
                      <Draggable>
                        <div className="bg-white shadow-lg" style={{ 
                          border: '1px solid #ccc', 
                          position: 'absolute', 
                          top: '12%',
                          left: '15%',
                        }}  >
                        <div className="grid grid-cols-2 p-2 text-left windowheader" style={{ cursor: 'move' }}>
                          <div>
                            Customer
                          </div>
                          <div className="text-right">
                            <span onClick={handleShowCustomer} className="cursor-pointer">❌</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="p-2">
                              <div>
                                Search: <input 
                                  type="text"
                                  className="mb-1"
                                  value={searchTerm}
                                  onChange={handleSearch}
                                  className="mb-1"/>
                              </div>
                              <table>
                                <thead className="tables">
                                  <tr>
                                    <th>Customer Code</th>
                                    <th>Name</th>
                                    <th>Shipping Address</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {filteredData.map((rowData, rowIndex) => (
                                    <tr className="trcus" key={rowIndex}>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.customerCode, rowData.customerName, rowData.cusShipAddress, rowData.cusTIN)}>{rowData.customerCode}</td>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.customerCode, rowData.customerName, rowData.cusShipAddress, rowData.cusTIN)}>{rowData.customerName}</td>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.customerCode, rowData.customerName, rowData.cusShipAddress, rowData.cusTIN)}>{rowData.cusShipAddress}</td>
                                      {/* {Object.values(rowData).map((value, colIndex) => (
                                        <td className="tdcus" key={colIndex} onClick={()=>addCustomerData(rowData.customerCode, rowData.customerName, rowData.cusShipAddress, rowData.cusTIN)} >{value}</td>
                                      ))} */}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                          </div>
                        </div>
                      </div>
                    </Draggable>
                    )
                  }
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="entrynumber">Customer Name.</label>
              <div>
                <input type="text"  value={customerData.map((e)=>e.customerName)} className="bg-slate-200" readOnly/>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="entrynumber">Walk-in Customer Name</label>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Customer Shipping Address</label>
              <div>
                <input type="text" value={customerData.map((e)=>e.cusShipAddress)}  />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Customer TIN</label>
              <div>
                <input type="text" value={customerData.map((e)=>e.cusTIN)} />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Customer Reference</label>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Branch</label>
              <div>
                <input type="text" readOnly/>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Document Status</label>
              <div>
                <input type="text" readOnly/>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Base Document</label>
              <div>
                <input type="text" readOnly/>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[] col1">
          <div className="grid grid-cols-2"> 
            <label htmlFor="documentnumber">Document Number</label>
            <div>
              <input type="text"/> <button className="w-[20px]  bg-slate-200" onClick={handleShowDoc}>=</button>
            </div>

            {/* Document Number */}
            {
              showDoc && (
                <Draggable>
                  <div className="w-[400px] h-[100px] bg-white shadow-lg" style={{ 
                    border: '1px solid #ccc', 
                    position: 'absolute', 
                    top: '12%',
                    left: '68.3%',
                  }}  >
                  <div className="grid grid-cols-2 p-2 text-left windowheader" style={{ cursor: 'move' }}>
                    <div>
                      Document Number
                    </div>
                    <div className="text-right">
                      <span onClick={handleShowDoc} className="cursor-pointer">❌</span>
                    </div>
                  </div>
                  <div className="content">
                  </div>
                </div>
              </Draggable>
              )
            }

          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="documentnumber">Draft Number</label>
            <div>
              <input type="text" readOnly/>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="entrynumber">Entry Number</label>
            <div>
              <input type="text" readOnly/>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="entrynumber">Document Date</label>
            <div>
              <input type="text" value={manilaDate} className="bg-slate-200" readOnly/>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="entrynumber" >Posting Date</label>
            <div>
              <input type="text" value={manilaDate} className="bg-slate-200" readOnly/>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="entrynumber">Delivery Date</label>
            <div>
              <input type="date" />
            </div>
          </div>
          
        </div>
      </div>
      <div className="fields mt-2 rounded-md text-left container bg-white overflow-x-auto shadow-xl p-2">
      <div className="">
        <table>
          <thead className="tables">
            <tr>
              <th></th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit of Measure (UOM)</th>
                <th>UOM Conversion</th>
                <th>Warehouse</th>
                <th>Inventory Status</th>
                <th>Selling Price before Discount</th>
                <th>Discount Rate</th>
                <th>Selling Price after Discount</th>
                <th>Lower Bound</th>
                <th>Tax Code</th>
                <th>Tax Code %</th>
                <th>Tax Amount</th>
                <th>Mode of Releasing (Manual Selection)</th>
                <th>SC/PWD Discount (Y/N)</th>
                <th>Gross Total</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData: any, rowIndex) => (
              <tr className="trcus" key={rowIndex}>
                <td>
                    <button onClick={() => handleRemoveRow(rowIndex)}>
                    <span className="text-md text-red-600">❌</span>
                    </button>
                </td>
                <td onClick={() => openItemTable(rowIndex)}>
                  <div className="grid grid-cols-2">
                     <div>
                      {rowData.itemCode}
                     </div>
                     <div className="text-right">
                        <button className="bg-[#F0AB00] pr-1 pl-1">=</button>
                     </div>
                  </div>
                </td>
                <td>{rowData.itemName}</td>
                <td>
                  <input
                    className="border-transparent"
                    type=""
                    value={rowData.quantity}
                    onChange={(e) => handleQuantityChange(rowIndex, e.target.value)}
                  />
                </td>
                <td>
                  <div className="grid grid-cols-2">
                     <div>
                      {rowData.uom}
                     </div>
                     <div className="text-right">
                        <button onClick={() => openOUMTable(rowIndex)} className="bg-[#F0AB00] pr-1 pl-1">=</button>
                     </div>
                  </div>
                </td>
                <td>
                  
                </td>
                <td>
                  <div className="grid grid-cols-2">
                     <div>
                      {rowData.location}
                     </div>
                     <div className="text-right">
                        <button onClick={() => openLocationTable(rowIndex)} className="bg-[#F0AB00] pr-1 pl-1">=</button>
                     </div>
                  </div>
                </td>
                <td></td>
                <td>
                  {localCurrency.format(rowData.sellingPriceBeforeDiscount)}
                </td>
                <td>
                  <input
                    className="border-transparent"
                    type=""
                    value={rowData.discountRate}
                    onChange={(e) => handleDiscountRateChange(rowIndex, e.target.value)}
                  />
                </td>
                <td>
                  {localCurrency.format(rowData.sellingPriceAfterDiscount)}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{localCurrency.format(rowData.grossTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Panel For Table  */}

        {
          openItemTablePanel && (
            <Draggable>
              <div className="fields h-[400px] overflow-x-auto bg-white shadow-lg" style={{ 
                border: '1px solid #ccc', 
                position: 'absolute', 
                top: '45%',
                left: '30%',
              }}  >
                
                <div className="grid grid-cols-2 p-2 text-left windowheader" style={{ cursor: 'move' }}>
                <div>
                  Item List
                </div>
                <div className="text-right">
                  <span onClick={openItemTable} className="cursor-pointer">❌</span>
                </div>
                </div>
                <div className="p-2">
                <div className="content">
                  <div>
                    Search: <input 
                      type="text"
                      className="mb-1"
                      value={searchTerm}
                      onChange={handleSearchItem}
                      className="mb-1"/>
                  </div>
                  <table>
                    <thead className="tables">
                      <tr>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredDataItem.map((item, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <tr className="trcus cursor-pointer">
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.itemCode}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.itemName}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.sellingPrice}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </Draggable>
          )
        }

        {
          openOUMPanel && (
            <Draggable>
              <div className="fields overflow-x-auto bg-white shadow-lg" style={{ 
                border: '1px solid #ccc', 
                position: 'absolute', 
                top: '45%',
                left: '35%',
              }}  >
                
                <div className="grid grid-cols-2 p-2 text-left windowheader" style={{ cursor: 'move' }}>
                <div>
                Select OUM
                </div>
                <div className="text-right">
                  <span onClick={openOUMTable} className="cursor-pointer">❌</span>
                </div>
                </div>
                <div className="p-2">
                <div className="content">
                  {/* <div>
                    Search: <input 
                      type="text"
                      className="mb-1"
                      value={searchTerm}
                      onChange={handleSearchItem}
                      className="mb-1"/>
                  </div>
                  <table>
                    <thead className="tables">
                      <tr>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredDataItem.map((item, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <tr className="trcus cursor-pointer">
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.itemCode}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.itemName}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.sellingPrice}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table> */}
                    
                    <div>
                      <table>
                        <thead className="tables">
                          <tr>
                            <th>UOM</th>
                            <th>Conversion</th>
                          </tr>
                        </thead>
                        <tbody>
                        {/* {filteredDataItem.map((item, index) => (
                          // eslint-disable-next-line react/jsx-key
                          <tr className="trcus cursor-pointer">
                            <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                              {item.itemCode}
                            </td>
                            <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                              {item.itemName}
                            </td>
                          </tr>
                        ))} */}
                          <tr className="trcus">
                            <td className="tdcus">Box</td>
                            <td className="tdcus">1</td>
                          </tr>
                          <tr className="trcus">
                            <td className="tdcus">PC</td>
                            <td className="tdcus">1</td>
                          </tr>
                          <tr className="trcus">
                            <td className="tdcus">Dozen</td>
                            <td className="tdcus">1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
                </div>
              </div>
            </Draggable>
          )
        }


        {
          openLocationPanel && (
            <Draggable>
              <div className="fields overflow-x-auto bg-white shadow-lg" style={{ 
                border: '1px solid #ccc', 
                position: 'absolute', 
                top: '20%',
                left: '20%',
                height: '300px'
              }}  >
                
                <div className="grid grid-cols-2 p-2 text-left windowheader" style={{ cursor: 'move' }}>
                <div>
                  Warehouse
                </div>
                <div className="text-right">
                  <span onClick={openLocationTable} className="cursor-pointer">❌</span>
                </div>
                </div>
                <div className="p-2">
                <div className="content">
                  {/* <div>
                    Search: <input 
                      type="text"
                      className="mb-1"
                      value={searchTerm}
                      onChange={handleSearchItem}
                      className="mb-1"/>
                  </div>
                  <table>
                    <thead className="tables">
                      <tr>
                        <th>Item Code</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredDataItem.map((item, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <tr className="trcus cursor-pointer">
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.itemCode}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.itemName}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.sellingPrice}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table> */}
                    
                    <div>
                      <div className="mb-2 text-[13px] flex gap-5">
                        <div>
                          Item Code: <input type="text" />
                        </div>
                        <div>
                          Item Name: <input type="text" />
                        </div>
                        <div>
                          UOM: <input type="text" />
                        </div>
                      </div>
                      <table>
                        <thead className="tables">
                          <tr>
                            <th>Warehouse Code</th>
                            <th>Warehouse Name</th>
                            <th>Availability</th>
                            <th>On-hand</th>
                            <th>Commited</th>
                          </tr>
                        </thead>
                        <tbody>
                        {/* {filteredDataItem.map((item, index) => (
                          // eslint-disable-next-line react/jsx-key
                          <tr className="trcus cursor-pointer">
                            <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                              {item.itemCode}
                            </td>
                            <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                              {item.itemName}
                            </td>
                          </tr>
                        ))} */}
                          
                          <tr>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
                </div>
              </div>
            </Draggable>
          )
        }


      </div>
      <div className="text-left ml-2">
        <button onClick={handleAddRow} className="p-1 mt-2 mb-1 text-[12px] bg-[#F4D674]"><span>+</span> Add Row</button>
      </div>
      <div className="text-left p-2 grid grid-cols-2 col1 text-[14px] mt-5">
          <div className="w-[300px] ">
            <div className="grid grid-cols-2">
              <label htmlFor="documentnumber">Mode of Payment</label>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="documentnumber">Mode of Releasing</label>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="documentnumber">Sales Crew</label>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="documentnumber">Remarks</label>
              <div>
                <textarea name="" id=""></textarea>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="documentnumber">Sales Crew</label>
              <div>
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="text-right w-full grid justify-end">  
            <div className="w-[440px] ">
              <div className="grid grid-cols-2 text-right">
                <label htmlFor="documentnumber" className="text-right">Total Amount Before VAT</label>
                <div>
                  <input value={totalBeforeVat} type="text" />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <label htmlFor="documentnumber">Total VAT</label>
                <div>
                  <input value={totalVat} type="text" />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <label htmlFor="documentnumber">Total After VAT</label>
                <div>
                  <input value={totalAfterVat} type="text" />
                </div>
              </div>
            </div>
        
          </div>
      </div>
      <div className="p-2 flex justify-start">
        <button className="p-2 mt-2 mb-1 mr-2 text-[12px] bg-[#F4D674]">Save as draft</button> 
        <button className="p-2 mt-2 mb-1 mr-2 text-[12px] bg-[#F4D674]">Commit</button>
      </div>
      {
        // <div className="text-left">
        //   <pre>{JSON.stringify(tableData, null, 2)}</pre>
        // </div>
      }
    </>
  );
}
