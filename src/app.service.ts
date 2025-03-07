/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// app.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import SiteUser from './model/site_user.model';
import Absensi from './model/absensi.model';

@Injectable()
export class AppService {
  validateUser(name: string, password: string): SiteUser | null {
    return (
      this.users.find(
        (user) => user.name === name && user.password === password,
      ) || null
    );
  }

  private absensiArray: Absensi[] = [];

  private users: SiteUser[] = [
    new SiteUser(
      '550e8400-e29b-41d4-a716-446655440000',
      'JohnDoe',
      'P@ssw0rd123',
      'BlackGold Rig 21',
    ),
    new SiteUser(
      '6f9619ff-8b86-d011-b42d-00cf4fc964ff',
      'AliceSmith',
      'Alice2024!',
      'DeepWell Alpha',
    ),
    new SiteUser(
      '7f8c1d8e-3a2f-4b74-9a3f-1f7636d5b45f',
      'BobJones',
      'Secure#789',
      'Offshore Bravo 7',
    ),
    new SiteUser(
      '3d1f3c77-91ff-4852-9b07-f4f8a732d29d',
      'CharlieM',
      'Pass123$',
      'Desert Rig Delta',
    ),
    new SiteUser(
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'DianaR',
      'Diana!2023',
      'Northern Basin 15',
    ),
    new SiteUser(
      'c001d00d-f00d-4a5e-bad1-deadbeefcafe',
      'EvanK',
      'Ev@nKpass',
      'Gulf Drilling 42',
    ),
    new SiteUser(
      'b1e2a3d4-c5f6-7890-abcd-deadfacedead',
      'FionaL',
      'F1ona#Pwd',
      'Rocky Oil Patch',
    ),
    new SiteUser(
      '5e4d3c2b-1a09-8765-4321-fedcba987654',
      'GeorgeB',
      'G3orge2022!',
      'Arctic Well Z-9',
    ),
    new SiteUser(
      'deadbeef-cafe-4bad-babe-feedfacefeed',
      'HannahW',
      'H@nnah987',
      'Deepwater Horizon',
    ),
    new SiteUser(
      'cafebabe-dead-beef-0000-000000000000',
      'IanT',
      'Ian_Pass!23',
      'Texas Shale 88',
    ),
  ];

  getTopUsers(count: number = 5): SiteUser[] {
    return this.users.slice(0, count);
  }

  addUser(name: string, password: string, site: string): string {
    if (!name || !password || !site) {
      throw new Error('Name, password, and site are required');
    }

    const existingUser = this.users.find((user) => user.name === name);
    if (existingUser) {
      throw new Error('User with this name already exists');
    }

    const id = this._generateUUID();

    const newUser = new SiteUser(id, name, password, site);
    this.users.push(newUser);
    return 'User added successfully';
  }

  private readonly SECRET_KEY = 'your_super_secure_secret_key_123!'; // Gantilah dengan key yang lebih kuat

  deleteUser(name: string): string {
    const index = this.users.findIndex((user) => user.name === name);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
    return 'User deleted successfully';
  }

  addAbsensi(
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
    const user = this.users.find((user) => user.id === accountId);
    if (!user) {
      throw new Error('User not found');
    }

    const id = this._generateUUID();
    const absensiBaru = new Absensi(
      id,
      startDate,
      startImageUrl,
      endDate,
      endImageUrl,
      lat,
      long,
      alamat,
      remarks,
      accountId,
    );

    this.absensiArray.push(absensiBaru);

    return this.absensiArray;
  }

  updateUser(name: string, password: string, site: string): string {
    const user = this.users.find((user) => user.name === name);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = password;
    user.site = site;
    return 'User updated successfully';
  }

  getFibonacci(n: number): number {
    if (n === 1) {
      return 1;
    } else if (n === 0) {
      return 0;
    } else {
      return this.getFibonacci(n - 1) + this.getFibonacci(n - 2);
    }
  }

  getFactorial(n: number): number {
    if (n === 1) {
      return 1;
    }
    return n * this.getFactorial(n - 1);
  }

  getTambah(a: number, b: number): number {
    return a + b;
  }

  getGabungnama(namaDepan: string, namaBelakang: string): string {
    return namaDepan + ' ' + namaBelakang;
  }

  getKurang(a: number, b: number): number {
    return a - b;
  }

  getPerkalian(a: number, b: number): number {
    return a * b;
  }

  getPembagian(a: number, b: number): number {
    return a / b;
  }

  getPythagoras(a: number, b: number): number {
    return Math.sqrt(a ** 2 + b ** 2);
  }

  generateUserJWT(
    name: string,
    site: string,
    expiresIn: string = '2h',
  ): string {
    const payload = { name, site };
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn });
  }

  verifyJWT(token: string): Record<string, any> | null {
    try {
      return jwt.verify(token, this.SECRET_KEY) as Record<string, any>;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid Token');
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token Expired');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  _generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}
