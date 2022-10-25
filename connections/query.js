import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export function drop_db(){
  console.log("dropping db");
  db.transaction(tx => {
    tx.executeSql("drop table coupons", [],
    (t, res) => console.log("drop db", t, res),
    (t, err) => console.error("drop db", t, err))
  }, (err) => console.error("err in tx", err),
  (success) => console.log("success in tx", success));
}

export default function insert_doc(coupon_code, company, text, image){
    console.log("executing insert");
    try{
      db.transaction(tx => {
        tx.executeSql(
          "create table if not exists coupons (id INTEGER PRIMARY KEY AUTOINCREMENT, coupon_id TEXT, company_name TEXT, expiry_date INT, description TEXT, image TEXT);"
        )
      });
      db.transaction(tx => { 
        tx.executeSql('INSERT INTO coupons (coupon_id, company_name, expiry_date, description, image) values (?, ?, ?, ?, ?)', [coupon_code, company, undefined, text, image],
        (txObj, result) => 
          console.log("insert doc success callback", txObj, result),
        (txObj, error) => 
          console.log("insert doc failure callback", txObj, error)
         );
      })
  } catch(error){
    console.error("insert doc error in query", error);
  } finally {
    console.log("db is closed");
  }
}

  
export async function  get_query(){
  console.log("getting data");
  let rows = [];
  try {
    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('select * from coupons', [],
        (txObj, result) => {
          console.log("success callback for get_query", txObj, result.rows)
          rows = result.rows._array
          return rows;
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

export function drop_data(){
  console.log("dropping data");
  db.transaction(tx => {
    tx.executeSql("delete from coupons where id>3", [],
    (t, res) => console.log("drop db", t, res),
    (t, err) => console.error("drop db", t, err))
  }, (err) => console.error("err in tx", err),
  (success) => console.log("success in tx", success));
}