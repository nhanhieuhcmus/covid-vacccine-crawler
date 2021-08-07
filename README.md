# Vaccine crawling

The vaccine data is crawling from https://tiemchungcovid19.gov.vn/portal

#### • [GET] https://covid-vaccine-crawler.herokuapp.com/all

```javascript
   Example:
   [
        {
            "id": "1",
            "province": "Hà Nội",
            "expected": "11,376,541",
            "real": "2,944,710",
            "population18": "5,745,728",
            "injection": "1,198,036",
            "expectedRate": "99 %",
            "injectionRate": "25.63 %",
            "injection1Rate": "20.85 %"
        },
        {
            "id": "2",
            "province": "Hà Giang",
            "expected": "978,109",
            "real": "104,470",
            "population18": "531,581",
            "injection": "60,993",
            "expectedRate": "92 %",
            "injectionRate": "9.83 %",
            "injection1Rate": "11.47 %"
        },
        ...
   ]
```
