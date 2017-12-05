export default function formatTanggal(tanggal) {
  let arrTanggal = tanggal.split('-')

  let date = arrTanggal[2]
  let bulan = ''
  let tahun = arrTanggal[0]

  switch(arrTanggal[1]) {
    case '01':
      bulan = "January"; break;
    case '02':
      bulan = "February"; break;
    case '03':
      bulan = "March"; break;
    case '04':
      bulan = "April"; break;
    case '05':
      bulan = "May"; break;
    case '06':
      bulan = "June"; break;
    case '07':
      bulan = "July"; break;
    case '08':
      bulan = "August"; break;
    case '09':
      bulan = "September"; break;
    case '10':
      bulan = "October"; break;
    case '11':
      bulan = "November"; break;
    case '12':
      bulan = "December"; break;
  }

  return date + " " + bulan + " " + tahun
}
