export default function formatRupiah(angka) {
  let counter = 1;
  let rupiah = ''
  let price = ''
  if (typeof angka === 'string') {
    price = angka.split('').reverse()
  } else {
    price = angka.toString().split('').reverse()
  }

  for (let i = 0; i < price.length; i++) {
    rupiah += price[i]
    if (counter % 3 === 0 && i !== price.length - 1) {
      rupiah += "."
    }

    counter++
  }

  rupiah = "Rp " + rupiah.split('').reverse().join('')

  return rupiah;
}
