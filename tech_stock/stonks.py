import json
import requests
from .config import api_key


def api_call():
    ticker_list = ["AAPL", "MSFT", "AMZN", "FB", "GOOG"]
    base_url = "https://www.quandl.com/api/v3/datasets/WIKI/"
    dates = "start_date=2010-10-01&end_date=2019-10-01"
    api = "&api_key=" + api_key

    stock_dict = {}
    for i in ticker_list:
        stock_dict[i] = []
        url= base_url + i + ".json?" + dates +api
        response = requests.get(url).json()
        y = len(response['dataset']['data'])
        for x in range(0, y):
            temp_dict = {}
            counter = 0
            name_holder = response['dataset']['name']
            name = name_holder.split()
            temp_dict['name'] = name[0]
            temp_dict['ticker'] = response['dataset']['dataset_code']
            for z in (response['dataset']['column_names']):
                temp_dict[z] = response['dataset']['data'][x][counter]
                counter = counter + 1
            stock_dict[i].append(temp_dict)
    

    return stock_dict