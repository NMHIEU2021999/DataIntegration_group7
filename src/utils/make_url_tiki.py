from distutils.log import error
import json
from tqdm import tqdm
import requests

url_book = "https://tiki.vn/api/personalish/v1/blocks/listings?limit=48&page={""}&category={""}&urlKey=nha-sach-tiki"
list_cat = [
    "8322", 
    "839", 
    "846",
    "393",
    "870",
    "873",
    "879",
    "880",
    "1084",
 ]

def save_file(data, file_name):
    with open(file_name, 'w') as file:
        json.dump(data, file, indent=4)


def get_url_item(url: str, max_page: int, file_name: str):
    final_data = []
    for cat in list_cat:
        for i in tqdm(range(1, max_page)):
            try:
                url_temp = url.format(i, cat)
                response = requests.get(url_temp, headers={
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
                })
                data = json.loads(response.text)
                final_data.extend(data['data'])
            except:
                print('error')
    list_url_item = []
    for item in final_data:
          list_url_item.append("https://tiki.vn/" + item['url_path'])

    print(len(list_url_item))
    save_file(list_url_item, file_name)


get_url_item(url_book, max_page=50, file_name='Crawl/Url/tiki/book.json')
