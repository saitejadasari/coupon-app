import * as SQLite from 'expo-sqlite';

export default function connection_db() {
const db = SQLite.openDatabase("db.db");
console.log("creating db");

    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists coupons (id INTEGER PRIMARY KEY AUTOINCREMENT, coupon_id TEXT, company_name TEXT, expiry_date INT, description TEXT  );"
      )
    });

}
  

