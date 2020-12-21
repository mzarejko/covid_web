import pandas as pd
import numpy as np

class DataCreator:
    
    def __init__(self, global_url):
        self.csv = pd.read_csv(global_url)

    def count_total(self, country):
        total = self.csv.loc[self.csv['Country/Region'] == country, self.csv.columns[-1]].sum()
        return total
            
    def get_data(self, country):
        targets = self.csv.loc[self.csv['Country/Region'] == country, self.csv.columns[4:]]
        labels = self.csv.columns[4:]

        targets = targets.values.tolist()
        labels = labels.values.tolist()
        
        # changing dimension of array
        targets = list(np.array(targets).reshape(-1))
         
        
        return labels, targets
    

