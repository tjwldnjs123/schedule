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
    if (!SESSION_ID) await loginEcount();
console.log('세션 id', SESSION_ID)
    // const quotationUrl = `https://oapi${ZONE}.ecount.com/OAPI/V2/Quotation/SaveQuotation?SESSION_ID=${SESSION_ID}`;
    // const requestData = {
    //   QuotationList: [
    //     {
    //       BulkDatas: {
    //         IO_DATE: "20250306",
    //         UPLOAD_SER_NO: "Q202503060001",
    //         CUST: "CUST001",
    //         CUST_DES: "고객A",
    //         EMP_CD: "EMP123",
    //         WH_CD: "WH001",
    //         IO_TYPE: "10",
    //         EXCHANGE_TYPE: "USD",
    //         EXCHANGE_RATE: "1300",
    //         PJT_CD: "PJT2025",
    //         REF_DES: "참조사항",
    //         COLL_TERM: "30일",
    //         AGREE_TERM: "계약 조건 1",
    //         DOC_NO: "DOC12345",
    //         TTL_CTT: "총 견적 금액",
    //         PROD_CD: "ITEM001",
    //         PROD_DES: "상품A",
    //         QTY: "10",
    //         PRICE: "50000",
    //         SUPPLY_AMT: "500000",
    //         VAT_AMT: "50000",
    //         REMARKS: "특별 할인 적용",
    //       },
    //     },
    //   ],
    // };

    // const response = await axios.post(quotationUrl, requestData);
    // console.log("견적서 저장 결과:", response.data);
    return response.data;
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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
