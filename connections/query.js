import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export function drop_db(){
  console.log("dropping db");
  db.transaction(tx => {
    tx.executeSql("drop database coupons", [],
    (t, res) => console.log("drop db", t, res),
    (t, err) => console.error("drop db", t, err))
  }, (err) => console.error("err in tx", err),
  (success) => console.log("success in tx", success));
}

export default function insert_doc(coupon_code, company, text){
    console.log("executing insert");
    try{
      db.transaction(tx => {
        tx.executeSql(
          "create table if not exists coupons (id INTEGER PRIMARY KEY AUTOINCREMENT, coupon_id TEXT, company_name TEXT, expiry_date INT, description TEXT  );"
        )
      });
      db.transaction(tx => { 
        tx.executeSql('INSERT INTO coupons (coupon_id, company_name, expiry_date, description) values (?, ?, ?, ?)', [coupon_code, company, undefined, text],
        (txObj, result) => 
          console.log("success callback", txObj, result),
        (txObj, error) => 
          console.log("failure callback", txObj, error)
         );
      })
  } catch(error){
    console.error("error in query", error);
  } finally {
    console.log("db is closed");
  }
}

  
export async function get_query(){
  console.log("getting data");
  let rows = [];
  try {
    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('select * from coupons', [],
        (txObj, result) => {
          console.log("success callback for get_query", txObj, result.rows)
          rows = result.rows._array
        },
        (txObj, error) => console.log("failure callback for get_query", txObj, error))
      }, reject, resolve);
    });
  } catch (error) {
    console.error("error in get_query", error);
  } finally {
    console.log("finally in get query");
  }
  console.log("returning data", rows);
  return rows;
}