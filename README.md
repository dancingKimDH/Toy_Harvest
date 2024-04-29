# PROJECT TOY_HARVEST
> __REACT & TYPESCRIPT__ (현재 진행형) 연습 프로젝트

## Key Feature
[바로가기](https://toy-harvest.web.app)

```
- 테스트ID: test123@test.com 
- Password: 12345678
```

## PROBLEM SOLVING
> 오류 및 해결 방법

### BACK-END
1. CORS ERROR
   - Background: 분양공고 페이지에서 농림수산식품교육문화정보원 API를 호출했으나 CORS 에러 발생
   - Solution: root directory에 /backend/server.ts를 만들어 우회!
   - Error: API Key를 .env에 작성해 활용하려고 했지만 어떤 이유에서인지 읽기에 실패함

<details>
   <summary>
      Code
   </summary>

~~~ typescript
import cors from 'cors';
import express from 'express';
import axios from 'axios';

const app = express();

const allowedOrigins = ["http://localhost:3000"]

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Data from Backend" })
})

app.get("/fetch-housing-data/:year", async (req, res) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`http://211.237.50.150:7080/openapi/6de97bd2f04693f272abb104a04c73687caad2061a5cbf20eb6f60dd9c4d6719/xml/Grid_20151214000000000336_1/1/5?SLCTN_YEAR=${year}`);
        // 6de97bd2f04693f272abb104a04c73687caad2061a5cbf20eb6f60dd9c4d6719
        res.json(response.data);
        return res;
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
});

app.listen(5000, () => {
    console.log("Server is now listening on PORT 5000");
})
~~~

</details>

### FRONT-END 

