import json
from time import sleep

import requests

session = requests.Session()

# 设置 User-Agent
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
})

cookies = {
    "secure": "samesite-Lax",
    "JSESSIONID": "431306AEC0B59C8487A44863D524E9D5",
    "Hm_lvt_633adb4e4314330d130f1b660b9ef837": "1742654905",
    "Hm_lpvt_633adb4e4314330d130f1b660b9ef837": "1742654905",
    "HMACCOUNT": "6E1723B5B56900E2"
}

headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "zh,en;q=0.9,zh-CN;q=0.8",
    "Cache-Control": "no-cache",
    "Origin": "https://data.library.sh.cn",
    "Pragma": "no-cache",
    "Referer": "https://data.library.sh.cn/familynames",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "X-Requested-With": "XMLHttpRequest",
    "async": "1",
    "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
}

url = r"https://data.library.sh.cn/familynames/searchName"

names = []
print("Retrieving names...")
for i in range(1,63):
    print(f"{i}/62")
    data = f"label=&name=&pageth={i}&iflimit=1"
    response = session.post(url, headers=headers, cookies=cookies, data=data)
    names.extend(response.json()["data"])
    sleep(1)

name_dicts = {
    "hans": [],
    "hant": []
}

for name in names:
    name_dicts["hans"].append({
        "n": name["nameS"],
        "t": name["nameE"]
    })
    name_dicts["hant"].append({
        "n": name["nameT"],
        "t": name["nameE"]
    })

for lang in ["hans", "hant"]:
    with open(fr"..\assets\names_{lang}.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(name_dicts[lang], ensure_ascii=False))

