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
  const [WareHouseList, setWareHouseList] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [cardCodedata, setcardCodedata] = useState("");
  const [taxCodeData, settaxCodeData] = useState([]);
  const [taxRateData, settaxRateData] = useState([]);
  const [lowerBoundData, setLowerBoundData] = useState("");

  const [itemcodewh, setitemcodewh] = useState("");
  const [itemnamews, setitemnamews] = useState("");
  const [itemuomws, setitemuomws] = useState("");

  const [showWindow, setShowWindow] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  const warehouseCode = "GSCNAPGS";
  const brandID = 4;
  const priceListNum = 14;
  const user = "Administrator";

  const now = new Date();
  
  const manilaDate = now.toLocaleDateString('en-US', { maximumFractionDigits: 4, timeZone: 'Asia/Manila' });

  const [itemcodetextalign, setitemcodetextalign] = useState('');

  const [openItemTablePanel, setOpenItemTablePanel] = useState(false);
  const [openOUMPanel, setOpenOUMPanel] = useState(false);
  const [openModRelTablePanel, setOpenModRelTablePanel] = useState(false);
  const [openLocationPanel, setOpenLocationPanel] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [totalAfterVat, settotalAfterVat] = useState("");
  const [totalBeforeVat, setTotalBeforeVat] = useState("");
  const [totalVat, setTotalVat] = useState("");
  const [sellingPriceAfterDiscountData, setSellingPriceAfterDis] = useState(0)

  let customerData2 = [{}];
  let currentCustomerData = customerList;
  const arrayCustomer = [
    customerList
  ]
  
  const [searchTerm, setSearchTerm] = useState('');

  const [tableData, setTableData] = useState([
    {
      itemCode: '',
      itemName: '',
      quantity: 0,
      uom: '',
      uomConversion: '',
      excludeBO: 'N',
      location: '',
      price: 0,
      inventoryStatus: '',
      sellingPriceBeforeDiscount: 0,
      discountRate: 0,
      sellingPriceAfterDiscount: 0,
      sellingPriceAfterDiscountTemp: 0,
      lowerBound: 0,
      taxCode: '',
      taxCodePercentage: 0,
      taxAmount: 0,
      volDisPrice: 0,
      belVolDisPrice: 'N',
      cost: 0,
      belCost: '', 
      modeOfReleasing: '',
      scPwdDiscount: '',
      grossTotal: 0,
      selected: false,
    }
  ]);

  const onAddHeader = async () => {
    const customers = await axios.get(`${process.env.NEXT_PUBLIC_IP}/customer`);
    setCustomerDataList(customers.data);
  };

  const onAddheaderItems = async () => {
    const item = await axios.get(`${process.env.NEXT_PUBLIC_IP}/item/${priceListNum}/${warehouseCode}/C000174`);
    setItemDataList(item.data);
  };
  
  const onAddHeaderUOM = async (itemcode: any, rowIndex: any) => {
    const uom = await axios.get(`${process.env.NEXT_PUBLIC_IP}/uom/${itemcode}`);
    setUOMList(uom.data);
    setUOMListIndex(rowIndex);
  };

  const onAddHeaderWareHouse = async (itemcode: any, name: any, uom: any) => {
    try{
      const warehouse = await axios.get(`${process.env.NEXT_PUBLIC_IP}/warehouse-soh/${itemcode}/${name}/${brandID}`)
      setWareHouseList(warehouse.data);
    }catch(e){

    }
  }

  const onAddHeaderTaxCode = async (cardCodex: any, whseCodex: any) => {
    const taxcode = await axios.get(`${process.env.NEXT_PUBLIC_IP}/tax-code/${cardCodex}/${whseCodex}`);
    console.log("Tax Code", taxcode.data);
    settaxCodeData(taxcode.data);
  }

  const onAddHeaderRateCode = async (taxcode: any) => {
    const taxrate = await axios.get(`${process.env.NEXT_PUBLIC_IP}/tax-rate/${taxcode}`);
    settaxRateData(taxrate.data);
  }

  const onAddLowerBound = async (bid: any, taxcodex: any, itemcodex: any, whscodex: any, indexNum: any, uomLoweBound: any) =>{
    const lowerbound = await axios.get(`${process.env.NEXT_PUBLIC_IP}/lowerbound/${bid}/${taxcodex}/${itemcodex}/${whscodex}/${uomLoweBound}`);

    let lowerBoundArr = lowerbound.data;

    setLowerBoundData(lowerBoundArr[indexNum]);

  }

  
  useEffect(()=>{
    onAddHeader();
    onAddheaderItems();
  }, []);

  const handleInputChange = (rowIndex: any, fieldName: any, value: any) => {
    const newData: any = [...tableData];
    newData[rowIndex][fieldName] = value;
    console.log(value)
  };

 
  

  const handleAddRow = (rowIndex: any, fieldName: any) => {

    setTableData(prevData => [
      ...prevData,
      {
        itemCode: '',
        itemName: '',
        quantity: 0,
        uom: '',
        uomConversion: '',
        excludeBO: 'N',
        location: '',
        price: 0,
        inventoryStatus: '',
        sellingPriceBeforeDiscount: 0,
        discountRate: 0,
        sellingPriceAfterDiscount: 0,
        sellingPriceAfterDiscountTemp: 0,
        lowerBound: 0,
        taxCode: '',
        taxCodePercentage: 0,
        taxAmount: 0,
        volDisPrice: 0,
        belVolDisPrice: 'N',
        cost: 0,
        belCost: '',
        modeOfReleasing: '',
        scPwdDiscount: '',
        grossTotal: 0,
        selected: false,
      },
    ]);


    onAddHeader();
    onAddheaderItems();


  };


  const [customerData, setCustomerData] = useState([
    {
      customerCode: '00000',
      customerName: 'N/A',
      customerCardFName: '',
      cusShipAddress: 'N/A',
      cusLicTradNum: 'N/A'
    }
  ]);

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

    onAddHeaderTaxCode(id, 'GSCNAPGS');

    const updatedTableData = [...tableData];

    const listArryLen = updatedTableData.length;
    

    taxRateData.map((e)=>{
      for(let i=0; i<listArryLen; i++){
        const item = updatedTableData[i];
        updatedTableData[i] = {
          ...item,
          taxCodePercentage: e.Rate
        };
        setTableData(updatedTableData);
      }
    })
  
    
    let newArray  = {
      customerCode: id,
      customerName: name,
      customerCardFName: fname,
      cusShipAddress: address,
      cusLicTradNum: tin
    }

    setcardCodedata(id);

    setCustomerData([
      newArray
    ])
    
    console.log(customerData2)
    setShowCustomer(!showCustomer);

  }

  const toggleShowWindow = () => {
    setShowWindow(!showWindow);
  }

  const handleRemoveRow = (rowIndex: any) => {
    let emptyData = 
    {
      itemCode: '',
      itemName: '',
      quantity: 0,
      uom: '',
      uomConversion: '',
      excludeBO: 'N',
      location: '',
      price: 0,
      inventoryStatus: '',
      sellingPriceBeforeDiscount: '',
      discountRate: '',
      sellingPriceAfterDiscount: '',
      sellingPriceAfterDiscountTemp: 0,
      lowerBound: 0,
      taxCode: '',
      taxCodePercentage: 0,
      taxAmount: '',
      volDisPrice: 0,
      belVolDisPrice: 'N',
      cost: 0,
      belCost: 0,
      modeOfReleasing: '',
      scPwdDiscount: '',
      grossTotal: '',
      selected: false,
    }

    
    const newData: any = [...tableData];
    const newData2: any = newData[rowIndex]
    const newData3: any = newData[rowIndex] = emptyData;

    const latestTableDataArr = tableData;

    setTableData((prevData) => prevData.filter((_, index) => index !== rowIndex));

  };


  const handleShowDoc = () => {
    setShowDoc(!showDoc);
  }

  const handleShowCustomer = () => {
    setShowCustomer(!showCustomer);
    onAddHeader();

    const updatedTableData = [...tableData];

    const listArryLen = updatedTableData.length;
    

    taxRateData.map((e)=>{
      for(let i=0; i<listArryLen; i++){
        const item = updatedTableData[i];
        updatedTableData[i] = {
          ...item,
          taxCodePercentage: e.Rate
        };
        setTableData(updatedTableData);
      }
    })
  }

  const openConsole = () => {
    console.log('open sample');
  }

  useEffect(()=>{

    let tempSum = 0;
    let tempSum2 = 0;
    let taxAmountSum = 0;

    const updatedTableData = [...tableData];

    let arrayLen = updatedTableData.length;
    
    for(let i=0; i<arrayLen; i++){
      tempSum = tempSum + (updatedTableData[i]['sellingPriceBeforeDiscount'] * parseInt(updatedTableData[i]['quantity']));
      tempSum2 = tempSum2 + updatedTableData[i]['grossTotal'];
      taxAmountSum = taxAmountSum + updatedTableData[i]['taxAmount'];
    }
    
    setTotalBeforeVat(localCurrency.format(tempSum - taxAmountSum))
    settotalAfterVat(localCurrency.format(tempSum2))
    setTotalVat(localCurrency.format(taxAmountSum));

  });


  function sum(){

    let tempSum = 0;

    const updatedTableData = [...tableData];

    let arrayLen = updatedTableData.length;
    
    for(let i=0; i<arrayLen; i++){
      tempSum = tempSum + updatedTableData[i]['grossTotal']
    }
  }

  sum();


  const [itemCodeForUOM, setItemCodeForUOM] = useState('');
  

  const openItemTable = (rowIndex: any) => {
    setOpenItemTablePanel(!openItemTablePanel);
    setSelectedRowIndex(rowIndex);

    taxCodeData.map((e)=>{
      onAddHeaderRateCode(e.TaxCode);
      
      const updatedTableData = [...tableData];

      const listArryLen = updatedTableData.length;
      
      taxRateData.map((e)=>{
        for(let i=0; i<listArryLen; i++){
          const item = updatedTableData[i];
          updatedTableData[i] = {
            ...item,
            taxCodePercentage: e.Rate
          };
          setTableData(updatedTableData);
        }
      })

    })

  }

  const openOUMTable = (rowIndex: any, itemCode: any) => {
    setOpenOUMPanel(!openOUMPanel);
    setSelectedRowIndex(rowIndex);
    setItemCodeForUOM(itemCode);
    onAddHeaderUOM(itemCode, rowIndex);
  }

    const openLocationTable = (rowIndex: any, itemcode: any, name: any, uom: any, itemname: any) => {
      setOpenLocationPanel(!openLocationPanel);
      setSelectedRowIndex(rowIndex);
      onAddHeaderWareHouse(itemcode, name, uom);
      
      setitemcodewh(itemcode);
      setitemnamews(itemname);
      setitemuomws(name);
    }

  const openModRelTable = (rowIndex: any) =>{
    setOpenModRelTablePanel(!openModRelTablePanel);
    setSelectedRowIndex(rowIndex);
  }
  
  const handleItemClick = async (item: any) => {
    if (selectedRowIndex !== null) {

      const updatedTableData = [...tableData];

      let taxRateDataNow = 0;
      let taxCodeDataNow = "";
      let lowerBoundNow = 0;

      taxRateData.map((e)=>{
        taxRateDataNow = e.Rate;
      })

      taxCodeData.map((e)=>{
        taxCodeDataNow = e.TaxCode
      })


      const lowerbound = await axios.get(`${process.env.NEXT_PUBLIC_IP}/lowerbound/${priceListNum}/${taxCodeDataNow}/${item.ItemCode}/${warehouseCode}/1`);
      const lowerboundArr = lowerbound.data;
      const lowerBoundFinalItem = lowerboundArr[0]['LowerBound'];
      const disPriceBefDis = updatedTableData[selectedRowIndex]['sellingPriceBeforeDiscount'];      

        updatedTableData[selectedRowIndex] = {

          ...updatedTableData[selectedRowIndex],
          itemCode: item.ItemCode,
          itemName: item.ItemName,
          quantity: 0,
          discountRate: 0,
          uom: item.UomCode,
          location: 'GSCNAPGS',
          price: item.SRP,
          lowerBound: lowerBoundFinalItem,
          taxCode: taxCodeDataNow,
          uomConversion: item.NumInSale,
          taxCodePercentage: taxRateDataNow,
          belCost: 'N',
          sellingPriceBeforeDiscount: item.SRP,
          sellingPriceAfterDiscount: item.SRP,
          taxAmount: item.SRP * 0.12,
          grossTotal: item.SRP
        };
        setTableData(updatedTableData);
        setShowItems(false);
        setSelectedRowIndex(null);
        setOpenItemTablePanel(!openItemTablePanel);
        setSellingPriceAfterDis(item.Price);

        const disCardCode = cardCodedata;
        const disItemCode = item.ItemCode;
        const disQuantity = updatedTableData[selectedRowIndex]['quantity'];
        const disUOM = updatedTableData[selectedRowIndex]['uom'];
        const disLowerBound = lowerBoundFinalItem;
        const disTaxCode = taxCodeDataNow;
        
    }
  };

  const changeTextBoxValue = (rowIndex: any) => {

    let sellingAfDis = document.getElementById('sellingAfDis');

    
    const updatedTableData = [...tableData];
    const item = updatedTableData[rowIndex];
    
    const sellingAfterDis = item.sellingPriceAfterDiscount;
    
    const itemCodeID = item.itemCode;

    let idUOM = document.getElementById(itemCodeID);

    idUOM?.setAttribute('value', sellingAfterDis);

  }

  const handleKeyPressSel = (event: { key: string; }, rowIndex: any, value: any) => {

    const updatedTableData = [...tableData];
    const item = updatedTableData[rowIndex];
    const sellingAfterDis = item.sellingPriceAfterDiscount;
    const sellingAfterDisTemp = item.sellingPriceAfterDiscountTemp;
    
    if(event.key === 'Enter'){

      let belCost = "";

      if(parseFloat(sellingAfterDis) < item.cost){
        belCost = "Y";
      }else{
        belCost = "N";
      }

      console.log("enter", sellingAfterDis, item.cost, value)

      if(parseFloat(value) < parseFloat(sellingAfterDisTemp)){
        console.log("Y")
        updatedTableData[rowIndex] = {
          ...item,
          grossTotal: value * item.quantity,
          belVolDisPrice: "Y",
          sellingPriceAfterDiscount: value,
          belCost: belCost
        };

        setTableData(updatedTableData);
      }else{
        updatedTableData[rowIndex] = {
          ...item,
          grossTotal: value * item.quantity,
          belVolDisPrice: "N",
          sellingPriceAfterDiscount: value,
          belCost: belCost
        };
        setTableData(updatedTableData);
      }
  
    }else{
      
    }
  }

  const handleQuantityChange =  async (rowIndex: any, quantity: any) => {
    
    const updatedTableData = [...tableData];
    const item = updatedTableData[rowIndex];
    const discount = item.discountRate;
    const amount = quantity * item.sellingPriceBeforeDiscount;

    const disPriceBefDis = item.sellingPriceBeforeDiscount;
    const disCardCode = cardCodedata;
    const disItemCode = item.itemCode;
    const disUOM = item.uom;
    const disLowerBound = item.lowerBound;
    const disTaxCode = item.taxCode;

    try{

      const disPrice = await axios.get(`${process.env.NEXT_PUBLIC_IP}/discount-price/${brandID}/${disPriceBefDis}/${disCardCode}/${disItemCode}/${quantity}/${disUOM}/${disLowerBound}/N/N/N/N/${disTaxCode}`);
    
      const disPriceArr = disPrice.data;

      const disAfterPrice = disPriceArr[0]['DiscPrice'];
      
      const disRateFor = ((disPriceBefDis - disAfterPrice)/disPriceBefDis)*100;

      const cost = await axios.get(`${process.env.NEXT_PUBLIC_IP}/cost/${item.itemCode}/${warehouseCode}`);
      const costArr = cost.data;

    
      let belowCostBool = "";

      if(item.sellingPriceAfterDiscount < costArr[0]['Cost']){
        belowCostBool = "N";
      }else{
        belowCostBool = "Y";
      }

      const quantityXuomConversion = quantity *item.uomConversion;

      const stocksAvailability = await axios.get(`${process.env.NEXT_PUBLIC_IP}/stocks-availability/0/${disItemCode}/${warehouseCode}/${quantityXuomConversion}/${item.excludeBO}`);
      const stocksAvailabilityArr = stocksAvailability.data;

      console.log("stocks", quantityXuomConversion)

      updatedTableData[rowIndex] = {
        ...item,
        quantity: quantity,
        discountRate: disRateFor,
        cost: costArr[0]['Cost'] * item.uomConversion,
        sellingPriceAfterDiscount: disPriceArr[0]['DiscPrice'],
        sellingPriceAfterDiscountTemp: disPriceArr[0]['DiscPrice'],
        grossTotal: quantity * item.sellingPriceAfterDiscount,
        taxAmount: (quantity * item.sellingPriceAfterDiscount) * 0.12,
        inventoryStatus: stocksAvailabilityArr[0]['StockAvailable']
      };
      setTableData(updatedTableData);
      setSellingPriceAfterDis(item.sellingPriceAfterDiscount);
      
    }catch(e){
      
    }
  };

  const handleChangeExcludeBO = async (value: any, rowIndex: any) => {

    const updatedTableData = [...tableData];
    const item = updatedTableData[rowIndex];
    const stocksAvailability = await axios.get(`${process.env.NEXT_PUBLIC_IP}/stocks-availability/0/${item.itemCode}/${warehouseCode}/${item.quantity}/${value}`);
    const stocksAvailabilityArr = stocksAvailability.data;

    updatedTableData[rowIndex] = {
      ...item,
      excludeBO: value,
      inventoryStatus: stocksAvailabilityArr[0]['StockAvailable']
    };

    setTableData(updatedTableData);
    console.log(value, item.quantity, stocksAvailabilityArr[0]['StockAvailable'])

  }

  const handleDiscountRateChange = (rowIndex: any, discountRates: any) => {
    const updatedTableData = [...tableData];
    const item = updatedTableData[rowIndex];
    const amount = ((discountRates/100) * item.sellingPriceBeforeDiscount);
    const finalAmount = item.sellingPriceBeforeDiscount - amount;
    updatedTableData[rowIndex] = {
      ...item,
      discountRate: discountRates,
      sellingPriceAfterDiscount: finalAmount,
      grossTotal: finalAmount * item.quantity,
    };
    setTableData(updatedTableData);
  };

  let localCurrency = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 7 })

  
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

  const handleUOM = async (rowindex: any, BaseQty: any, UomCode: any) => {

    const updatedTableData = [...tableData];
    const item = updatedTableData[UOMListIndex];

    const uomtaxCode = item['taxCode'];
    const uomitemCode = item['itemCode'];
    const uomtaxAmout = item['taxAmount'];

    const lowerbound = await axios.get(`${process.env.NEXT_PUBLIC_IP}/lowerbound/${priceListNum}/${uomtaxCode}/${uomitemCode}/${warehouseCode}/${BaseQty}`);
    const lowerboundArr = lowerbound.data;
    const lowerBoundFinalItem = lowerboundArr[0]['LowerBound'];
    
    const srp = await axios.get(`${process.env.NEXT_PUBLIC_IP}/srp/${uomitemCode}/${BaseQty}/${UomCode}/${uomtaxCode}/${lowerBoundFinalItem}/${cardCodedata}/${priceListNum}`);
    const srpdata = srp.data;

    const quantityXuomConversion = item.quantity * BaseQty;

    const stocksAvailability = await axios.get(`${process.env.NEXT_PUBLIC_IP}/stocks-availability/0/${item.itemCode}/${warehouseCode}/${quantityXuomConversion}/${item.excludeBO}`);
    const stocksAvailabilityArr = stocksAvailability.data;

    let quantityChange = 0;

    if(item.quantity == 0){
      quantityChange = 0;
    }else{
      quantityChange = item.quantity;
    }

    console.log(item.sellingPriceAfterDiscountTemp, "dan")

    updatedTableData[UOMListIndex] = {
      ...item,
      uomConversion: BaseQty,
      uom: UomCode,
      lowerBound: lowerBoundFinalItem,
      sellingPriceBeforeDiscount: srpdata[0]['SRP'],
      grossTotal: (item.price * BaseQty) * item.quantity,
      quantity: quantityChange,
      setSellingPriceAfterDis: item.sellingPriceAfterDiscountTemp * BaseQty,
      inventoryStatus: stocksAvailabilityArr[0]['StockAvailable']
    };
    setTableData(updatedTableData);
    setOpenOUMPanel(!openOUMPanel);

  }

  // Mode of Releasing Function
  const modeReleasing = (value: any) => {
    const updatedTableData = [...tableData];

    const listArryLen = updatedTableData.length;

    for(let i=0; i<listArryLen; i++){
      const item = updatedTableData[i];
      updatedTableData[i] = {
        ...item,
        modeOfReleasing: value
      };
      setTableData(updatedTableData);
    }
    
  }

  const changeManualModRel = (moderel: any) => {
    const updatedTableData = [...tableData];

    console.log(moderel);

    const item = updatedTableData[selectedRowIndex];

    updatedTableData[selectedRowIndex] = {
      ...item,
      modeOfReleasing: moderel
    };

    console.log(item)

    setTableData(updatedTableData);
    setOpenModRelTablePanel(!openModRelTablePanel);
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
              <input value={0} type="text"/>
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
      <div className="fields mt-2 rounded-md text-left container bg-white overflow-x-auto shadow-xl p-2 max-h-[200px]">
      <div className="">
        <table>
          <thead className="tables">
            <tr>
              <th></th>
                <th>Item Codes</th>
                <th>Item Name</th>
                <th>Unit of Measure (UOM)</th>
                <th>UOM Conversion</th>
                <th>Exclude BO</th>
                <th>Warehouse</th>
                <th>Quantity</th>
                <th>Inventory Status</th>
                <th>Price</th>
                <th>Selling Price before Discount</th>
                <th>Discount Rate (%)</th>
                <th>Selling Price after Discount</th>
                <th>Lower Bound</th>
                <th>Tax Code</th>
                <th>Tax Rate %</th>
                <th>Tax Amount</th>
                {/* <th>Vol. Disc. Price</th> */}
                <th>Below Vol. Disc. Price</th>
                <th>Cost</th>
                <th>Below Cost</th>
                <th>Mode of Releasing</th>
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
                <td>
                  <div className="flex gap-3 justify-end">
                     <div>
                      {rowData.itemCode}
                     </div>
                     <div className="text-right">
                        {
                          cardCodedata != "" && (
                            <button className="bg-[#F0AB00] pr-1 pl-1" onClick={() => openItemTable(rowIndex)}>=</button>
                          )
                        }
                     </div>
                  </div>
                </td>
                <td>{rowData.itemName}</td>
                
                <td>
                  {
                    rowData.itemCode == 0 ? '' : (
                      <div className="grid grid-cols-2">
                        <div>
                          {rowData.uom}
                        </div>
                        <div className="text-right">
                            {
                              rowData.itemCode != "" && (
                                <button onClick={() => openOUMTable(rowIndex, rowData.itemCode)} className="bg-[#F0AB00] pr-1 pl-1">=</button>
                              )
                            }
                        </div>
                      </div>
                    )
                  }
                </td>
                <td>
                  {
                    rowData.uom == "" ? '' : rowData.uomConversion
                  }
                </td>
                  <td>
                  <select name="" onChange={(e)=>handleChangeExcludeBO(e.target.value, rowIndex)} id="" className="w-[100px] h-[20px]">
                      <option value="N" selected>N</option>
                      <option value="Y">Y</option>
                  </select>
                  </td>
                <td>
                  {
                    rowData.uom == "" ? '' : (
                      <div className="flex gap-3 justify-end">
                        <div>
                          {rowData.location}
                        </div>
                        <div className="text-right">
                            {
                              rowData.uom != "" && (
                                <button onClick={() => openLocationTable(rowIndex, rowData.itemCode, rowData.uom, rowData.uomConversion, rowData.itemName)} className="bg-[#F0AB00] pr-1 pl-1">=</button>
                              )
                            }
                        </div>
                      </div>
                    )
                  }
                </td>
                <td>
                  <input
                    className=" border-l-white border-t-white border-r-white"
                    type=""
                    placeholder="0"
                    onChange={(e) => handleQuantityChange(rowIndex, e.target.value)}
                  />
                </td>
                <td className={
                  rowData.quantity == 0 ? 'bg-white' : rowData.inventoryStatus === "Available" ? "bg-green-200" : rowData.inventoryStatus === "Out of Stocks" ? "bg-red-200" : ""
                }>
                  {
                    rowData.quantity == 0 ? '' : rowData.inventoryStatus
                  }
                </td>
                <td>
                  {
                    rowData.quantity == 0 ? '' : localCurrency.format(rowData.price)
                  }
                </td>
                <td>
                  {
                    rowData.quantity == 0 ? '' : localCurrency.format(rowData.sellingPriceBeforeDiscount)
                  }
                </td>
                <td>
                  {/* <input
                    className="border-transparent"
                    type=""
                    value={rowData.discountRate}
                    onChange={(e) => handleDiscountRateChange(rowIndex, e.target.value)}
                  /> */}

                  {   
                    rowData.quantity <= 0 ? '' : parseFloat(Math.max(rowData.discountRate).toFixed(2)) <= 0 ? 0 : Math.max(rowData.discountRate).toFixed(2)
                  }
                </td>
                <td>
                  {
                    rowData.quantity == 0 ? '' : (
                      <div className="flex gap-2">
                        <div>
                          <input
                          className="w-[100px] border-l-white border-t-white border-r-white"
                          type="number"
                          id={rowData.itemCode}
                          onClick={(e)=>changeTextBoxValue(rowIndex)}
                          onKeyPress={(e)=>handleKeyPressSel(e, rowIndex, e.target.value)}
                        />
                        </div>
                        <div>
                          {
                            rowData.sellingPriceAfterDiscountTemp
                          }
                        </div>
                      </div>
                    )
                  }
                  
                  
                </td>
                <td>
                {
                  rowData.quantity == 0 ? '' : localCurrency.format(rowData.lowerBound)
                }
                </td>
                <td>
                  {
                    rowData.taxCode
                  }
                </td>
                <td>
                  {
                    rowData.taxCodePercentage
                  }%
                </td>
                <td>
                  {
                     rowData.quantity == 0 ? '' : localCurrency.format(rowData.taxAmount)
                  }
                </td>
                {/* <td>
                  {
                    rowData.quantity == 0 ? '' : rowData.sellingPriceAfterDiscount
                  }
                </td> */}
                <td className={
                  rowData.belVolDisPrice == "Y" ? "bg-red-200 " : ""
                }> 
                  {
                    rowData.quantity == 0 ? '' : rowData.belVolDisPrice
                  }
                </td>
                <td>
                  {
                    Math.floor(rowData.cost).toFixed(2)
                  }
                </td>
                <td
                  className={
                    rowData.belCost == "Y" ? "bg-red-200" : ""
                  }
                >
                  {
                    rowData.belCost
                  }
                </td>
                <td>
                  {
                    rowData.quantity == 0 ? '' : (
                      <div className="flex gap-3 justify-end">
                        <div>
                          {rowData.modeOfReleasing}
                        </div>
                        <div className="text-right">
                        
                                <button onClick={() => openModRelTable(rowIndex)} className="bg-[#F0AB00] pr-1 pl-1">=</button>
                            
                        </div>
                      </div>
                    )
                  }
                </td>
                <td></td>
                <td>
                  {
                    rowData.quantity == 0 ? '' : localCurrency.format(rowData.grossTotal)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
                          {localCurrency.format(item.SRP)}
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
                    <div>
                      <table>
                        <thead className="tables">
                          <tr>
                            <th>UOM</th>
                            <th>Conversion</th>
                          </tr>
                        </thead>
                        <tbody>
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
          openModRelTablePanel && (
            <Draggable>
              <div className="fields overflow-x-auto bg-white shadow-lg" style={{ 
                border: '1px solid #ccc', 
                position: 'absolute', 
                top: '40%',
                left: '65%',
              }}  >
                
                <div className="grid grid-cols-2 p-2 text-left windowheader" style={{ cursor: 'move' }}>
                <div>
                  Mode of Releasing
                </div>
                <div className="text-right">
                  <span onClick={openModRelTable} className="cursor-pointer">❌</span>
                </div>
                </div>
                <div className="p-2">
                <div className="content">
                    <table>
                    <thead className="tables">
                        <tr>
                        <th>Item Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <select name="" className="w-full p-2" onChange={(e)=>changeManualModRel(e.target.value)} id="">
                              <option value="" disabled selected>Please Select</option>
                              <option value="Standard-Pick-up">Standard-Pick-up</option>
                              <option value="Standard-Delivery">Standard-Delivery</option>
                              <option value="Standard-Pick-up to Other Store">Standard-Pick-up to Other Store</option>
                              <option value="Back Order-Pick-up">Back Order-Pick-up</option>
                              <option value="Back Order-Delivery">Back Order-Delivery</option>
                              <option value="Back Order-Pick-up to Other Store">Back Order-Pick-up to Other Store</option>
                              <option value="Drop-Ship-Pick-up to DC">Drop-Ship-Pick-up to DC</option>
                              <option value="Drop-Ship-Pick-up to Vendor">Drop-Ship-Pick-up to Vendor</option>
                              <option value="Drop-Ship-Delivery from DC">Drop-Ship-Delivery from DC</option>
                              <option value="Drop-Ship-Delivery from Vendor">Drop-Ship-Delivery from Vendor</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                    <div>
                      <div className="mb-2 text-[13px] flex gap-5">
                        <div>
                          Item Code: <span className="underline">{itemcodewh}</span>
                        </div>
                        <div>
                          Item Name: <span className="underline">{itemnamews}</span>
                        </div>
                        <div>
                          UOM: <span className="underline">{itemuomws}</span>
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
                          {
                            WareHouseList.map((item, index)=>(
                              // eslint-disable-next-line react/jsx-key
                              <tr>
                                <td className="tdcus" key={index}>
                                    {item.WhsCode}
                                </td>
                                <td className="tdcus" key={index}>
                                    {item.WhsName}
                                </td>
                                <td className="tdcus" key={index}>
                                    {item.Availability}
                                </td>
                                <td className="tdcus" key={index}>
                                    {item.OnHand}
                                </td>
                                <td className="tdcus" key={index}>
                                    {item.Committed}
                                </td>
                              </tr>
                            ))
                          }

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

        {
          cardCodedata != "" && (
            <button onClick={handleAddRow} className="p-1 mt-2 mb-1 text-[12px] bg-[#F4D674]"><span>+</span> Add Row</button>
          )
        }
        
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
                <select className="selections" onChange={(e)=>modeReleasing(e.target.value)} name="" id="">
                  <option value="" disabled selected>Please Select</option>
                  <option value="Standard-Pick-up">Standard-Pick-up</option>
                  <option value="Standard-Delivery">Standard-Delivery</option>
                  <option value="Standard-Pick-up to Other Store">Standard-Pick-up to Other Store</option>
                  <option value="Back Order-Pick-up">Back Order-Pick-up</option>
                  <option value="Back Order-Delivery">Back Order-Delivery</option>
                  <option value="Back Order-Pick-up to Other Store">Back Order-Pick-up to Other Store</option>
                  <option value="Drop-Ship-Pick-up to DC">Drop-Ship-Pick-up to DC</option>
                  <option value="Drop-Ship-Pick-up to Vendor">Drop-Ship-Pick-up to Vendor</option>
                  <option value="Drop-Ship-Delivery from DC">Drop-Ship-Delivery from DC</option>
                  <option value="Drop-Ship-Delivery from Vendor">Drop-Ship-Delivery from Vendor</option>
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
                  <input value={totalAfterVat} type="text" />
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
                  <input value={totalBeforeVat} type="text" />
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
        <div className="text-left">
          {/* <pre>{JSON.stringify(tableData, null, 2)}</pre> */}
        </div>
      }
    </>
  );
}
