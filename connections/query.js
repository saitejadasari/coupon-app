import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

export default function query(){
    console.log("executing query");
    db.transaction(tx => { 
      tx.executeSql('INSERT INTO coupons (coupon_id, company_name, expiry_date, description) values (?, ?, ?, ?)', ['crgatedh', 'Walmart', 11-23-2022, '50% off'],
      (txObj, result) => console.log("success callback", txObj, result),
      (txObj, error) => console.log("failure callback", txObj, error)
      );      
    }
    )
}

  
export function get_query(){
  console.log("getting data");
  db.transaction(tx => {
    tx.executeSql('select * from coupons', null,
    (txObj, result) => console.log("success callback", result.rows),
    (txObj, error) => console.log("failure callback", txObj, error))
  })
}