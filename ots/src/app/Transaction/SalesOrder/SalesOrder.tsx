"use client";

import React, { use, useEffect, useState } from "react";
import Data from "../../Data/Data.json"
import SalesQoutation from "../SalesQoutation/SalesQoutation";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import Draggable from "react-draggable";

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
    },
  ]);

  const handleInputChange = (rowIndex: any, fieldName: any, value: any) => {
    const newData: any = [...tableData];
    newData[rowIndex][fieldName] = value;
  };

  const handleAddRow = () => {
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
      },
    ]);
  };

  const [showWindow, setShowWindow] = useState(false);
  const [showDoc, setShowDoc] = useState(false);

  // 

  const toggleShowWindow = () => {
    setShowWindow(!showWindow);
  }

  const handleRemoveRow = (rowIndex: any) => {
    setTableData((prevData) => prevData.filter((_, index) => index !== rowIndex));
  };


  const handleShowDoc = () => {
    setShowDoc(!showDoc);
  }

  return (
    <>
      <div className="salesbody p-2 text-sm rounded-md flex gap-40  container overflow-x-auto rounded-lg">
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
                    left: '30%',
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
              <input type="date" readOnly/>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="entrynumber">Posting Date</label>
            <div>
              <input type="date" readOnly/>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="entrynumber">Delivery Date</label>
            <div>
              <input type="date" />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <label htmlFor="entrynumber">Due Date</label>
            <div>
              <input type="date" />
            </div>
          </div>
        </div>
        <div className="w-[] flex flex-wrap gap-5 col1 mr-3">
          <div>
            <div className="grid grid-cols-2">
              <label htmlFor="entrynumber">Customer Code</label>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="entrynumber">Customer Name</label>
              <div>
                <input type="text" />
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
                <input type="text" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <label className="" htmlFor="entrynumber">Customer TIN</label>
              <div>
                <input type="text" />
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
      </div>
      <div className="fields mt-2 rounded-md text-left container bg-white overflow-x-auto shadow-xl p-2">
      <table>
      
        <thead className="tables">
          <tr>
            <th></th>
            <th>Item Code</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit of Measure (UOM)</th>
              <th>UOM Conversion</th>
              <th>Location</th>
              <th>Inventory Status</th>
              <th>Selling Price before Discount (VAT-INC)</th>
              <th>Discount Rate</th>
              <th>Selling Price after Discount (VAT-INC)</th>
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
            <tr key={rowIndex}>
              <td>
                    <button onClick={() => handleRemoveRow(rowIndex)}>
                    <span className="text-md text-red-600">❌</span>
                    </button>
                  </td>
              {Object.keys(rowData).map((fieldName, colIndex) => (
                <><td
                  key={colIndex}
                  contentEditable={true}
                  onInput={(e) => handleInputChange(rowIndex, fieldName, e.target.innerText)}
                >
                  {rowData[fieldName]}
                </td></>
              ))}
              
            </tr>
          ))}
        </tbody>
      </table>
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
                <textarea name="" id="" cols="30" rows="10"></textarea>
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
                  <input type="text" />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <label htmlFor="documentnumber">Total VAT</label>
                <div>
                  <input type="text" />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <label htmlFor="documentnumber">Total After VAT</label>
                <div>
                  <input type="text" />
                </div>
              </div>
            </div>
        
          </div>
      </div>
      <div className="p-2 flex justify-start">
        <button className="p-2 mt-2 mb-1 mr-2 text-[12px] bg-[#F4D674]">Add</button> 
        <button className="p-2 mt-2 mb-1 mr-2 text-[12px] bg-[#F4D674]">Search</button> 
        <button className="p-2 mt-2 mb-1 mr-2 text-[12px] bg-[#F4D674]">Print</button>
      </div>
      {
        // <div className="text-left">
        //   <pre>{JSON.stringify(tableData, null, 2)}</pre>
        // </div>
      }
    </>
  );
}
