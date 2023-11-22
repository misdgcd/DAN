"use client";

import React, { use, useEffect, useState } from "react";
import Data from "../../Data/Data.json"
import SalesQoutation from "../SalesQoutation/SalesQoutation";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export default function SalesOrder() {

  const [customerList, setCustomerDataList] = useState([]);
  const [itemList, setItemDataList] = useState([]);
  const [UOMList, setUOMList] = useState([]);
  const [UOMListIndex, setUOMListIndex] = useState([]);

  const onAddHeader = async () => {
    const customers = await axios.get(`${process.env.NEXT_PUBLIC_IP}/customer`);
    setCustomerDataList(customers.data);
    console.log("customer", customers.data)
  };

  const onAddheaderItems = async () => {
    const item = await axios.get(`${process.env.NEXT_PUBLIC_IP}/item/14/GSCNAPGS`);
    setItemDataList(item.data);
    console.log("items", item.data)
  };
  
  const onAddHeaderUOM = async (itemcode: any, rowIndex: any) => {
    const uom = await axios.get(`${process.env.NEXT_PUBLIC_IP}/uom/${itemcode}`);
    setUOMList(uom.data);
    setUOMListIndex(rowIndex);
    console.log("uom", uom.data, "rowindex", rowIndex)
  };

  useEffect(()=>{
    onAddHeader();
    onAddheaderItems();
  }, []);


  const [tableData, setTableData] = useState([
    {
      itemCode: '',
      itemName: '',
      quantity: '',
      uom: '',
      uomConversion: '',
      location: '',
      price: 0,
      inventoryStatus: '',
      sellingPriceBeforeDiscount: 0,
      discountRate: 0,
      sellingPriceAfterDiscount: 0,
      lowerBound: '',
      taxCode: '',
      taxCodePercentage: 12,
      taxAmount: 0,
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

 
  

  const handleAddRow = (rowIndex: any, fieldName: any) => {
    // onAddHeader;
    setTableData(prevData => [
      ...prevData,
      {
        itemCode: '',
        itemName: '',
        quantity: '',
        uom: '',
        uomConversion: '',
        location: 'GSCNAPGS',
        price: 0,
        inventoryStatus: '',
        sellingPriceBeforeDiscount: 0,
        discountRate: 0,
        sellingPriceAfterDiscount: 0,
        lowerBound: '',
        taxCode: '',
        taxCodePercentage: 12,
        taxAmount: 0,
        modeOfReleasing: '',
        scPwdDiscount: '',
        grossTotal: 0,
        selected: false,
      },
    ]);


    onAddHeader();
    onAddheaderItems();


  };




  // Array Declarations

  const [customerData, setCustomerData] = useState([
    {
      customerCode: '00000',
      customerName: 'N/A',
      customerCardFName: '',
      cusShipAddress: 'N/A',
      cusLicTradNum: 'N/A'
    }
  ]);

  let customerData2 = [{}];

  let currentCustomerData = customerList;


  
  // Search Table

  const arrayCustomer = [
    customerList
  ]

  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = currentCustomerData
  .filter((rowData) => {
    return (
      Object.values(rowData).some((value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  })
  .slice(0, 20);


  const addCustomerData = (id:any, name:any, fname:any, address:any, tin:any) => {
    
    let newArray  = {
      customerCode: id,
      customerName: name,
      customerCardFName: fname,
      cusShipAddress: address,
      cusLicTradNum: tin
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
      price: 0,
      inventoryStatus: '',
      sellingPriceBeforeDiscount: '',
      discountRate: '',
      sellingPriceAfterDiscount: '',
      lowerBound: '',
      taxCode: '',
      taxCodePercentage: '12',
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
    onAddHeader();
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


  const [itemCodeForUOM, setItemCodeForUOM] = useState('');
  

  const openItemTable = (rowIndex: any) => {
    setOpenItemTablePanel(!openItemTablePanel);
    setSelectedRowIndex(rowIndex);
  }

  const openOUMTable = (rowIndex: any, itemCode: any) => {
    setOpenOUMPanel(!openOUMPanel);
    setSelectedRowIndex(rowIndex);
    console.log("itemcode", itemCode)
    setItemCodeForUOM(itemCode);
    onAddHeaderUOM(itemCode, rowIndex);
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
        itemCode: item.ItemCode,
        itemName: item.ItemName,
        quantity: 1,
        discountRate: 0,
        uom: item.UomCode,
        location: 'GSCNAPGS',
        price: item.Price,
        uomConversion: item.NumInSale,
        sellingPriceBeforeDiscount: item.Price,
        sellingPriceAfterDiscount: item.Price,
        taxAmount: item.Price * 0.12,
        grossTotal: item.Price
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
      grossTotal: quantity * item.sellingPriceAfterDiscount,
      taxAmount: (quantity * item.sellingPriceAfterDiscount) * 0.12
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

  const filteredDataItem = itemList.filter((rowData) => {
    return (
      Object.values(rowData).some((value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }).slice(0, 50);

  const handleUOM = (rowindex: any, BaseQty: any, UomCode: any) => {
    const updatedTableData = [...tableData];
    const item = updatedTableData[UOMListIndex];

    updatedTableData[UOMListIndex] = {
      ...item,
      uomConversion: BaseQty,
      uom: UomCode,
      sellingPriceBeforeDiscount: item.price * BaseQty,
      sellingPriceAfterDiscount: item.price * BaseQty,
      grossTotal: (item.price * BaseQty) * item.quantity
      // Other calculations if needed
    };
    setTableData(updatedTableData);

    console.log(rowindex, BaseQty, UOMListIndex, item)

  }


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
                                    <th>Foreign Name</th>
                                    <th>Shipping Address</th>
                                    <th>LicTradNum</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {filteredData.map((rowData: any, rowIndex) => (
                                    <tr className="trcus" key={rowIndex}>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.CardCode, rowData.CardName, rowData.CardFName, rowData.Address, rowData.LicTradNum)}>{rowData.CardCode}</td>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.CardCode, rowData.CardName, rowData.CardFName, rowData.Address, rowData.LicTradNum)}>{rowData.CardName}</td>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.CardCode, rowData.CardName, rowData.CardFName, rowData.Address, rowData.LicTradNum)}>{rowData.CardFName}</td>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.CardCode, rowData.CardName, rowData.CardFName, rowData.Address, rowData.LicTradNum)}>{rowData.Address}</td>
                                      <td className="tdcus" onClick={()=>addCustomerData(rowData.CardCode, rowData.CardName, rowData.CardFName, rowData.Address, rowData.LicTradNum)}>{rowData.LicTradNum}</td>
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
              <label htmlFor="entrynumber">Customer Name</label>
              <div>
                <input type="text"  value={customerData.map((e)=>e.customerName)} className="bg-slate-200" readOnly/>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Foreign Name</label>
              <div>
                <input type="text" value={customerData.map((e)=>e.customerCardFName)} readOnly/>
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
                <input type="text" value={customerData.map((e)=>e.cusLicTradNum)} />
              </div>
            </div>
            
            
          </div>
          <div>
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
                <th>Item Codes</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit of Measure (UOM)</th>
                <th>UOM Conversion</th>
                <th>Warehouse</th>
                <th>Inventory Status</th>
                <th>Price</th>
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
                  <div className="flex gap-3 justify-end">
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
                        <button onClick={() => openOUMTable(rowIndex, rowData.itemCode)} className="bg-[#F0AB00] pr-1 pl-1">=</button>
                     </div>
                  </div>
                </td>
                <td>
                  {rowData.uomConversion}
                </td>
                <td>
                <div className="flex gap-3 justify-end">
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
                  {
                    localCurrency.format(rowData.price)
                  }
                </td>
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
                <td>
                  {
                    rowData.taxCodePercentage
                  }%
                </td>
                <td>
                  {
                    localCurrency.format(rowData.taxAmount)
                  }
                </td>
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
              <div className="fields h-[500px] overflow-x-auto bg-white shadow-lg" style={{ 
                border: '1px solid #ccc', 
                position: 'absolute', 
                width: '80%',
                top: '10%',
                left: '10%',
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
                        <th>Availability</th>
                        <th>UOM</th>
                        <th>Num In Sale</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredDataItem.map((item, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <tr className="trcus cursor-pointer">
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.ItemCode}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.ItemName}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {localCurrency.format(item.Price)}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.Availability}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.UomCode}
                        </td>
                        <td className="tdcus" key={index} onClick={() => handleItemClick(item)}>
                          {item.NumInSale}
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
                          {UOMList.map((e, rowIndex)=>(
                            // eslint-disable-next-line react/jsx-key
                            <tr className="trcus cursor-pointer">
                              <td className="tdcus cursor-pointer" onClick={()=>handleUOM(rowIndex, e.BaseQty, e.UomCode)}>
                                  {e.UomCode}
                              </td>
                              <td className="tdcus cursor-pointer" onClick={()=>handleUOM(rowIndex, e.BaseQty, e.UomCode)}>
                                  {e.BaseQty}
                              </td>
                            </tr>
                          ))}
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
              <label htmlFor="documentnumber">Mode of Payment:</label>
              <div className="">
                <div className="flex justify-start gap-2 w-[100px]">
                  <input className="w-[20px]" type="checkbox" />
                  Cash
                </div>
                <div className="flex justify-start gap-2">
                  <input className="w-[20px]" type="checkbox" />
                  Credit Card
                </div>
                <div className="flex justify-start gap-2">
                  <input className="w-[20px]" type="checkbox" />
                  Debit Card
                </div>
                <div className="flex justify-start gap-2">
                  <input className="w-[20px]" type="checkbox" />
                  Dated Check
                </div>
                <div className="flex justify-start gap-2 w-[200px]">
                  <input className="w-[20px]" type="checkbox" />
                  Dated Check Check
                </div>
                <div className="flex justify-start gap-2">
                  <input className="w-[20px]" type="checkbox" />
                  Online Transfer
                </div>
                <div className="flex justify-start gap-2">
                  <input className="w-[20px]" type="checkbox" />
                  On Account
                </div>
                <div className="flex justify-start gap-2">
                  <input className="w-[20px]" type="checkbox" />
                  Cash on Delivery
                </div>

              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="documentnumber">Mode of Releasing</label>
              <div>
                <select className="selections" name="" id="">
                  <option value="" disabled selected>Please Select</option>
                  <option value="">Standard-Pick-up</option>
                  <option value="">Standard-Delivery</option>
                  <option value="">Standard-Pick-up to Other Store</option>
                  <option value="">Back Order-Pick-up</option>
                  <option value="">Back Order-Delivery</option>
                  <option value="">Back Order-Pick-up to Other Store</option>
                  <option value="">Drop-Ship-Pick-up to DC</option>
                  <option value="">Drop-Ship-Pick-up to Vendor</option>
                  <option value="">Drop-Ship-Delivery from DC</option>
                  <option value="">Drop-Ship-Delivery from Vendor</option>
                </select>
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
