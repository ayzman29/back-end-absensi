// src/interfaces/user.interface.ts
export default class Absensi {
  id: string;
  startDate: string;
  startImageUrl: string;
  endDate: string;
  endImageUrl: string;
  lat: string;
  long: string;
  alamat: string;
  remarks: string;
  accountId: string;

  constructor(
    id: string,
    startDate: string,
    startImageUrl: string,
    endDate: string,
    endImageUrl: string,
    lat: string,
    long: string,
    alamat: string,
    remarks: string,
    accountId: string,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.startImageUrl = startImageUrl;
    this.endDate = endDate;
    this.endImageUrl = endImageUrl;
    this.lat = lat;
    this.long = long;
    this.alamat = alamat;
    this.remarks = remarks;
    this.accountId = accountId;
  }
}
