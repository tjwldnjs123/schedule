require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const { COM_CODE, USER_ID, API_CERT_KEY, LAN_TYPE } = process.env;
let SESSION_ID = "";
let ZONE = "";

// 1. ZONE 조회
async function getZone() {
  const COM_CODE = process.env.COM_CODE; 
  try {
    const response = await axios.post("https://sboapi.ecount.com/OAPI/V2/Zone", {
      COM_CODE,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  console.log(response)
    if (response.data.Data.ZONE) {
      ZONE = response.data.Data.ZONE;
      console.log("ZONE 조회 성공:", ZONE);
      return ZONE;
    } else {
      throw new Error("ZONE 조회 실패");
    }
  } catch (error) {
    console.error("ZONE 조회 오류:", error.message);
    return null;
  }
}


// 2️. 로그인 요청 (SESSION_ID)
async function loginEcount() {
  try {
    if (!ZONE) await getZone();
    const loginUrl = `https://sboapi${ZONE}.ecount.com/OAPI/V2/OAPILogin`;
    const response = await axios.post(loginUrl, {
      COM_CODE,
      USER_ID,
      API_CERT_KEY,
      LAN_TYPE,
      ZONE,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.Data.Datas.SESSION_ID) {
      SESSION_ID = response.data.Data.Datas.SESSION_ID;
      console.log("로그인 성공! SESSION_ID:", SESSION_ID);
      return SESSION_ID;
    } else {
      throw new Error("로그인 실패");
    }
  } catch (error) {
    console.error("로그인 오류:", error.message);
    return null;
  }
}

// 3️. 견적서 저장 API
async function saveQuotation() {
  try {
    if (!SESSION_ID || !ZONE) await loginEcount();
  
    const quotationUrl = `https://sboapi${ZONE}.ecount.com/OAPI/V2/Quotation/SaveQuotation?SESSION_ID=${SESSION_ID}`;
    // 전표 생성 객체 갯수마다 SuccessCnt 변경
    const requestData = {
      "QuotationList": [{
       "BulkDatas": {
        "IO_DATE": "20200213",
        "UPLOAD_SER_NO": "",
        "CUST": "",
        "CUST_DES": "",
        "EMP_CD": "",
        "WH_CD": "",
        "IO_TYPE": "",
        "EXCHANGE_TYPE": "",
        "EXCHANGE_RATE": "",
        "PJT_CD": "",
        "REF_DES": "",
        "COLL_TERM": "",
        "AGREE_TERM": "",
        "DOC_NO": "",
        "TTL_CTT": "",
        "U_MEMO1": "",
        "U_MEMO2": "",
        "U_MEMO3": "",
        "U_MEMO4": "",
        "U_MEMO5": "",
        "ADD_TXT_01_T": "",
        "ADD_TXT_02_T": "",
        "ADD_TXT_03_T": "",
        "ADD_TXT_04_T": "",
        "ADD_TXT_05_T": "",
        "ADD_TXT_06_T": "",
        "ADD_TXT_07_T": "",
        "ADD_TXT_08_T": "",
        "ADD_TXT_09_T": "",
        "ADD_TXT_10_T": "",
        "ADD_NUM_01_T": "",
        "ADD_NUM_02_T": "",
        "ADD_NUM_03_T": "",
        "ADD_NUM_04_T": "",
        "ADD_NUM_05_T": "",
        "ADD_CD_01_T": "",
        "ADD_CD_02_T": "",
        "ADD_CD_03_T": "",
        "ADD_DATE_01_T": "",
        "ADD_DATE_02_T": "",
        "ADD_DATE_03_T": "",
        "U_TXT1": "",
        "ADD_LTXT_01_T": "",
        "ADD_LTXT_02_T": "",
        "ADD_LTXT_03_T": "",
        "PROD_CD": "00001",
        "PROD_DES": "test",
        "SIZE_DES": "",
        "UQTY": "",
        "QTY": "1",
        "PRICE": "",
        "USER_PRICE_VAT": "",
        "SUPPLY_AMT": "",
        "SUPPLY_AMT_F": "",
        "VAT_AMT": "",
        "REMARKS": "",
        "ITEM_CD": "",
        "P_AMT1": "",
        "P_AMT2": "",
        "P_REMARKS1": "",
        "P_REMARKS2": "",
        "P_REMARKS3": "",
        "ADD_TXT_01": "",
        "ADD_TXT_02": "",
        "ADD_TXT_03": "",
        "ADD_TXT_04": "",
        "ADD_TXT_05": "",
        "ADD_TXT_06": "",
        "ADD_NUM_01": "",
        "ADD_NUM_02": "",
        "ADD_NUM_03": "",
        "ADD_NUM_04": "",
        "ADD_NUM_05": "",
        "ADD_CD_01": "",
        "ADD_CD_02": "",
        "ADD_CD_03": "",
        "ADD_CD_NM_01": "",
        "ADD_CD_NM_02": "",
        "ADD_CD_NM_03": "",
        "ADD_CDNM_01": "",
        "ADD_CDNM_02": "",
        "ADD_CDNM_03": "",
        "ADD_DATE_01": "",
        "ADD_DATE_02": "",
        "ADD_DATE_03": ""
       }
      },{
       "BulkDatas": {
        "IO_DATE": "20200213",
        "UPLOAD_SER_NO": "",
        "CUST": "",
        "CUST_DES": "",
        "EMP_CD": "",
        "WH_CD": "",
        "IO_TYPE": "",
        "EXCHANGE_TYPE": "",
        "EXCHANGE_RATE": "",
        "PJT_CD": "",
        "REF_DES": "",
        "COLL_TERM": "",
        "AGREE_TERM": "",
        "DOC_NO": "",
        "U_MEMO1": "",
        "U_MEMO2": "",
        "U_MEMO3": "",
        "U_MEMO4": "",
        "U_MEMO5": "",
        "ADD_TXT_01_T": "",
        "ADD_TXT_02_T": "",
        "ADD_TXT_03_T": "",
        "ADD_TXT_04_T": "",
        "ADD_TXT_05_T": "",
        "ADD_TXT_06_T": "",
        "ADD_TXT_07_T": "",
        "ADD_TXT_08_T": "",
        "ADD_TXT_09_T": "",
        "ADD_TXT_10_T": "",
        "ADD_NUM_01_T": "",
        "ADD_NUM_02_T": "",
        "ADD_NUM_03_T": "",
        "ADD_NUM_04_T": "",
        "ADD_NUM_05_T": "",
        "ADD_CD_01_T": "",
        "ADD_CD_02_T": "",
        "ADD_CD_03_T": "",
        "ADD_DATE_01_T": "",
        "ADD_DATE_02_T": "",
        "ADD_DATE_03_T": "",
        "U_TXT1": "",
        "ADD_LTXT_01_T": "",
        "ADD_LTXT_02_T": "",
        "ADD_LTXT_03_T": "",
        "PROD_CD": "00001",
        "PROD_DES": "test",
        "SIZE_DES": "",
        "UQTY": "",
        "QTY": "1",
        "PRICE": "",
        "USER_PRICE_VAT": "",
        "SUPPLY_AMT": "",
        "SUPPLY_AMT_F": "",
        "VAT_AMT": "",
        "REMARKS": "",
        "ITEM_CD": "",
        "P_AMT1": "",
        "P_AMT2": "",
        "P_REMARKS1": "",
        "P_REMARKS2": "",
        "P_REMARKS3": "",
        "ADD_TXT_01": "",
        "ADD_TXT_02": "",
        "ADD_TXT_03": "",
        "ADD_TXT_04": "",
        "ADD_TXT_05": "",
        "ADD_TXT_06": "",
        "ADD_NUM_01": "",
        "ADD_NUM_02": "",
        "ADD_NUM_03": "",
        "ADD_NUM_04": "",
        "ADD_NUM_05": "",
        "ADD_CD_01": "",
        "ADD_CD_02": "",
        "ADD_CD_03": "",
        "ADD_CD_NM_01": "",
        "ADD_CD_NM_02": "",
        "ADD_CD_NM_03": "",
        "ADD_CDNM_01": "",
        "ADD_CDNM_02": "",
        "ADD_CDNM_03": "",
        "ADD_DATE_01": "",
        "ADD_DATE_02": "",
        "ADD_DATE_03": ""
       }
      },{
        "BulkDatas": {
         "IO_DATE": "20200213",
         "UPLOAD_SER_NO": "",
         "CUST": "",
         "CUST_DES": "",
         "EMP_CD": "",
         "WH_CD": "",
         "IO_TYPE": "",
         "EXCHANGE_TYPE": "",
         "EXCHANGE_RATE": "",
         "PJT_CD": "",
         "REF_DES": "",
         "COLL_TERM": "",
         "AGREE_TERM": "",
         "DOC_NO": "",
         "U_MEMO1": "",
         "U_MEMO2": "",
         "U_MEMO3": "",
         "U_MEMO4": "",
         "U_MEMO5": "",
         "ADD_TXT_01_T": "",
         "ADD_TXT_02_T": "",
         "ADD_TXT_03_T": "",
         "ADD_TXT_04_T": "",
         "ADD_TXT_05_T": "",
         "ADD_TXT_06_T": "",
         "ADD_TXT_07_T": "",
         "ADD_TXT_08_T": "",
         "ADD_TXT_09_T": "",
         "ADD_TXT_10_T": "",
         "ADD_NUM_01_T": "",
         "ADD_NUM_02_T": "",
         "ADD_NUM_03_T": "",
         "ADD_NUM_04_T": "",
         "ADD_NUM_05_T": "",
         "ADD_CD_01_T": "",
         "ADD_CD_02_T": "",
         "ADD_CD_03_T": "",
         "ADD_DATE_01_T": "",
         "ADD_DATE_02_T": "",
         "ADD_DATE_03_T": "",
         "U_TXT1": "",
         "ADD_LTXT_01_T": "",
         "ADD_LTXT_02_T": "",
         "ADD_LTXT_03_T": "",
         "PROD_CD": "00001",
         "PROD_DES": "test",
         "SIZE_DES": "",
         "UQTY": "",
         "QTY": "1",
         "PRICE": "",
         "USER_PRICE_VAT": "",
         "SUPPLY_AMT": "",
         "SUPPLY_AMT_F": "",
         "VAT_AMT": "",
         "REMARKS": "",
         "ITEM_CD": "",
         "P_AMT1": "",
         "P_AMT2": "",
         "P_REMARKS1": "",
         "P_REMARKS2": "",
         "P_REMARKS3": "",
         "ADD_TXT_01": "",
         "ADD_TXT_02": "",
         "ADD_TXT_03": "",
         "ADD_TXT_04": "",
         "ADD_TXT_05": "",
         "ADD_TXT_06": "",
         "ADD_NUM_01": "",
         "ADD_NUM_02": "",
         "ADD_NUM_03": "",
         "ADD_NUM_04": "",
         "ADD_NUM_05": "",
         "ADD_CD_01": "",
         "ADD_CD_02": "",
         "ADD_CD_03": "",
         "ADD_CD_NM_01": "",
         "ADD_CD_NM_02": "",
         "ADD_CD_NM_03": "",
         "ADD_CDNM_01": "",
         "ADD_CDNM_02": "",
         "ADD_CDNM_03": "",
         "ADD_DATE_01": "",
         "ADD_DATE_02": "",
         "ADD_DATE_03": ""
        }
       },
    ]
 }

    const response = await axios.post(quotationUrl, requestData);
    console.log("견적서 저장 결과:", response);
    // return response.data;
  } catch (error) {
    console.error("견적서 저장 오류:", error.message);
    return null;
  }
}

(async () => {
  await getZone();
  await loginEcount();
  await saveQuotation(); 
})();

