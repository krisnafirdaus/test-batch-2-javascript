// var input = 10;
// const tampilan = "";

// input % 2 === 0 ? tampilan = "Even" : tampilan = "Odd";

// console.log(tampilan);

// if(input % 2 === 0) {
// 	console.log('Even');
// } else if(input === 0) {
// 	console.log('Salah input!!')
// } else {
// 	console.log('Odd');
// }

// switch (input % 2 === 0) {
// 	case true:
// 		console.log('Even');
// 		break;
// 	default:
// 		console.log('Odd');
// 		break;
// }

// var arr = [2, 4, 5, 6]

// var jumlah = arr.reduce((acc, current) => {
// 	console.log('acc', acc);
// 	console.log('current', current);
// 	return acc + current;
// })

// console.log(jumlah);

// Objek untuk menyimpan data pelanggan
let customers = [];

// Fungsi validasi nomor rekening
function isValidAccountNumber(accountNumber) {
  // Contoh validasi sederhana: nomor rekening harus berupa string angka dengan panjang 6
  return /^\d{6}$/.test(accountNumber);
}

// Fungsi validasi data pelanggan sebelum penambahan
function validateCustomerData(name, accountNumber) {
  if (!name || typeof name !== 'string') {
    console.error('Nama tidak valid');
    return false;
  }
  if (!isValidAccountNumber(accountNumber)) {
    console.error('Nomor rekening tidak valid');
    return false;
  }
  return true;
}


// Fungsi untuk menciptakan pelanggan baru
function createCustomer(name, accountNumber) {
  const newCustomer = {
    name: name,
    accountNumber: accountNumber,
    balance: 0,
    transactionHistory: []
  };
  customers.push(newCustomer);
  return newCustomer;
}

// Fungsi untuk mencari pelanggan berdasarkan nomor rekening
function findCustomerByAccountNumber(accountNumber) {
  return customers.find(customer => customer.accountNumber === accountNumber);
}

// Fungsi untuk deposit
function deposit(accountNumber, amount) {
  const customer = findCustomerByAccountNumber(accountNumber);
  if (customer) {
    customer.balance += amount;
    customer.transactionHistory.push({
      type: 'deposit',
      amount: amount,
      date: new Date()
    });
    console.log(`Deposit sebesar ${amount} berhasil. Saldo saat ini: ${customer.balance}`);
  } else {
    console.error('Akun tidak ditemukan');
  }
}

// Fungsi untuk withdrawal dengan struktur keputusan
function withdraw(accountNumber, amount) {
  const customer = findCustomerByAccountNumber(accountNumber);
  if (!customer) {
    console.error('Akun tidak ditemukan');
    return;
  }
  if (customer.balance >= amount) {
    customer.balance -= amount;
    customer.transactionHistory.push({
      type: 'withdrawal',
      amount: amount,
      date: new Date()
    });
    console.log(`Withdrawal sebesar ${amount} berhasil. Saldo saat ini: ${customer.balance}`);
  } else {
    console.error('Saldo tidak cukup');
  }
}

// Fungsi untuk memeriksa saldo
function checkBalance(accountNumber) {
  const customer = findCustomerByAccountNumber(accountNumber);
  if (customer) {
    console.log(`Saldo untuk rekening ${accountNumber} adalah ${customer.balance}`);
  } else {
    console.error('Akun tidak ditemukan');
  }
}

// Fungsi untuk melihat histori transaksi
function viewTransactionHistory(accountNumber) {
  const customer = findCustomerByAccountNumber(accountNumber);
  if (customer) {
    console.log(`Riwayat transaksi untuk rekening ${accountNumber}:`);
    customer.transactionHistory.forEach(transaction => {
      console.log(`${transaction.date}: ${transaction.type} - ${transaction.amount}`);
    });
  } else {
    console.error('Akun tidak ditemukan');
  }
}

// Fungsi untuk transaksi berulang dengan alur rekurensi
function recurringTransaction(accountNumber, amount, frequency, repetitions) {
  const customer = findCustomerByAccountNumber(accountNumber);
  if (!customer) {
    console.error('Akun tidak ditemukan');
    return;
  }

  if (repetitions > 0) {
    setTimeout(() => {
      customer.balance += amount;
      customer.transactionHistory.push({
        type: 'recurring transaction',
        amount: amount,
        date: new Date()
      });
      console.log(`Transaksi berulang sebesar ${amount} berhasil. Saldo saat ini: ${customer.balance}`);
      recurringTransaction(accountNumber, amount, frequency, repetitions - 1);
    }, frequency);
  }
}

// Fungsi untuk mengedit informasi pelanggan
function editCustomerInfo(accountNumber, newInfo) {
  const customer = findCustomerByAccountNumber(accountNumber);
  if (!customer) {
    console.error('Akun tidak ditemukan');
    return;
  }
  // Update informasi pelanggan dengan informasi baru
  Object.keys(newInfo).forEach(key => {
    if (customer.hasOwnProperty(key)) {
      customer[key] = newInfo[key];
    }
  });
}

function performTransaction(accountNumber, amount) {
  return new Promise((resolve, reject) => {
    const customer = findCustomerByAccountNumber(accountNumber);
    if (!customer) {
      reject('Akun tidak ditemukan');
      return;
    }
    if (amount <= 0) {
      reject('Jumlah harus lebih besar dari 0');
      return;
    }
    if (customer.balance >= amount) {
      customer.balance -= amount;
      const transaction = {
        type: 'withdrawal',
        amount: amount,
        date: new Date(),
        status: 'success'
      };
      customer.transactionHistory.push(transaction);
      resolve(transaction);
    } else {
      const transaction = {
        type: 'withdrawal',
        amount: amount,
        date: new Date(),
        status: 'failed'
      };
      customer.transactionHistory.push(transaction);
      reject('Saldo tidak cukup');
    }
  });
}

function getHighBalanceCustomers() {
  return customers.filter(customer => customer.balance > 1000);
}

function calculateTotalBalance() {
  return customers.reduce((total, customer) => total + customer.balance, 0);
}

// Contoh penggunaan fungsi editCustomerInfo
editCustomerInfo('123456', {
  address: '123 Main St',
  phoneNumber: '555-1234',
  accountType: 'Checking'
});

// Contoh penggunaan fungsi getHighBalanceCustomers dan calculateTotalBalance
console.log(getHighBalanceCustomers());
console.log(`Total saldo semua pelanggan: ${calculateTotalBalance()}`);

// Contoh penggunaan fungsi
createCustomer('John Doe', '123456');
deposit('123456', 1000);
withdraw('123456', 500);
checkBalance('123456');
viewTransactionHistory('123456');
recurringTransaction('123456', 100, 1000, 10); // Transaksi berulang 10 kali dengan interval 5 detik
