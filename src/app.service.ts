/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// app.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

class SiteUser {
  name: string;
  password: string;
  site: string;

  constructor(name: string, password: string, site: string) {
    this.name = name;
    this.password = password;
    this.site = site;
  }
}

const users: SiteUser[] = [
  new SiteUser('JohnDoe', 'P@ssw0rd123', 'BlackGold Rig 21'),
  new SiteUser('AliceSmith', 'Alice2024!', 'DeepWell Alpha'),
  new SiteUser('BobJones', 'Secure#789', 'Offshore Bravo 7'),
  new SiteUser('CharlieM', 'Pass123$', 'Desert Rig Delta'),
  new SiteUser('DianaR', 'Diana!2023', 'Northern Basin 15'),
  new SiteUser('EvanK', 'Ev@nKpass', 'Gulf Drilling 42'),
  new SiteUser('FionaL', 'F1ona#Pwd', 'Rocky Oil Patch'),
  new SiteUser('GeorgeB', 'G3orge2022!', 'Arctic Well Z-9'),
  new SiteUser('HannahW', 'H@nnah987', 'Deepwater Horizon'),
  new SiteUser('IanT', 'Ian_Pass!23', 'Texas Shale 88'),
];

@Injectable()
export class AppService {
  private readonly SECRET_KEY = 'your_super_secure_secret_key_123!'; // Gantilah dengan key yang lebih kuat

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

  generateUserJWT(
    username: string,
    firstName: string,
    lastName: string,
    gender: string,
    expiresIn: string = '2h',
  ): string {
    const payload = { username, firstName, lastName, gender };
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
}
