/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Query,
  Get,
  UnauthorizedException,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { count } from 'console';
import SiteUser from './model/site_user.model';
import Absensi from './model/absensi.model';

@Controller()
export class AppController {
  users: any;
  constructor(private readonly appService: AppService) {}

  @Post('/fibonaci')
  getFibonacci(@Body() body: { n: number }) {
    const { n } = body;

    if (n === undefined || n === null) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Fibonacci',
        data: { result: null },
      };
    }

    try {
      const result = this.appService.getFibonacci(n);

      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Fibonacci',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fibonacci',
        errorMessage: error,
        data: { result: null },
      };
    }
  }

  @Post('/factorial')
  getFactorial(@Body() body: { n: number }) {
    const { n } = body;

    if (n === undefined || n === null) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Factorial',
        data: { result: null },
      };
    }

    try {
      const result = this.appService.getFactorial(n);

      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Factorial',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Factorial',
        errorMessage: 'GOBLOK',
        data: { result: null },
      };
    }
  }

  @Post('/tambah')
  getTambah(@Body() body: { a: number; b: number }) {
    const { a, b } = body;
    if (a === undefined || b === null) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Tambah',
        data: { result: null },
      };
    }

    try {
      const result = this.appService.getTambah(a, b);
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Tambah',
          errorMessage: 'Gak gitu',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Tambah',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Tambah',
        errorMessage: 'Gak gitu',
        data: { result: null },
      };
    }
  }

  @Post('/gabungNama')
  getGabungnama(@Body() body: { namaDepan: string; namaBelakang: string }) {
    const { namaDepan, namaBelakang } = body;
    if (
      namaDepan === undefined ||
      namaDepan === null ||
      namaBelakang === undefined ||
      namaBelakang === null
    ) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Id Anda',
        data: { result: null },
      };
    }

    try {
      const result = this.appService.getGabungnama(namaDepan, namaBelakang);
      if (result === null || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Id Anda',
          errorMessage: 'Sok Tau',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Id Anda',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Id Anda',
        errorMessage: 'Sok Tau',
        data: { result: null },
      };
    }
  }

  @Post('TopUsers')
  getTopUsers(
    @Body()
    body: {
      count: number;
    },
  ) {
    const { count } = body;
    try {
      const result = this.appService.getTopUsers(count);
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'TopUsers',
          errorMessage: 'Gak gitu',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'TopUsers',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'TopUsers',
        errorMessage: 'Gak gitu',
        data: { result: null },
      };
    }
  }
  // getTopUsers(count: number = 5): SiteUser[] {
  //   return this.users.slice(0, count);

  @Post('AddUser')
  addUser(@Body() body: { name: string; password: string; site: string }) {
    const { name, password, site } = body;

    if (!name || !password || !site) {
      throw new Error('Name, password, and location are required');
    }

    try {
      const result = this.appService.addUser(name, password, site);
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Add User',
          errorMessage: 'User failed to add',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'User Added',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Add User',
        errorMessage: 'User failed to add',
        data: { result: null },
      };
    }
  }

  @Delete('DeleteUser')
  deleteUser(@Body('name') name: string): string {
    return this.appService.deleteUser(name);
  }

  @Delete('DeleteAbsensi')
  deleteAbsensi(@Body('id') id: string): string {
    return this.appService.deleteAbsensi(id);
  }

  @Put('Update')
  updateUser(@Body() body: { name: string; password: string; site: string }) {
    const { name, password, site } = body;
    return this.appService.updateUser(name, password, site);
  }

  @Post('Absensi')
  addAbsensi(
    @Body() startDate: string,
    startImageUrl: string,
    endDate: string,
    endImageUrl: string,
    lat: string,
    long: string,
    alamat: string,
    remarks: string,
    accountId: string,
  ) {
    try {
      const result = this.appService.addAbsensi(
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
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Add Absensi',
          errorMessage: 'Absensi Failed',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Absensi Success',
        data: { result },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Add User',
        errorMessage: 'Absensi Failed',
        data: { result: null },
      };
    }
  }

  @Put('UpdateAbsensi')
  updateAbsensi(
    @Body('Id') Id: string,
    @Body('endDate') endDate: string,
    @Body('endImageUrl') endImageUrl: string,
    @Body('remarks') remarks: string,
  ) {
    try {
      const result = this.appService.updateAbsensi(
        Id,
        endDate,
        endImageUrl,
        remarks,
      );
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Update Absensi',
          errorMessage: 'Update Failed',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Update Absensi Success',
        data: { result },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Update Absensi',
        errorMessage: 'Update Failed',
        data: { result: null },
      };
    }
  }

  getToken(
    @Body()
    body: {
      name: string;
      site: string;
    },
  ) {
    const { name, site } = body;
    return {
      token: this.appService.generateUserJWT(name, site),
    };

    // const { userName, firstName, lastName, gender } = body;
    // console.log(body);
    // if (
    //   userName === undefined ||
    //   userName === null ||
    //   firstName === undefined ||
    //   firstName === null ||
    //   lastName === undefined ||
    //   lastName === null ||
    //   gender === undefined ||
    //   gender === null
    // ) {
    //   return {
    //     status: 'failed',
    //     code: HttpStatus.BAD_REQUEST,
    //     message: 'Token anda',
    //     data: { result: null },
    //   };
    // }

    // try {
    //   const result = this.appService.generateUserJWT(
    //     userName,
    //     firstName,
    //     lastName,
    //     gender,
    //   );
    //   if (result === null || result === undefined) {
    //     return {
    //       status: 'failed',
    //       code: HttpStatus.INTERNAL_SERVER_ERROR,
    //       message: 'Token anda',
    //       errorMessage: 'Sok Tau',
    //       data: { result: null },
    //     };
    //   }
    //   return {
    //     status: 'success',
    //     code: HttpStatus.OK,
    //     message: 'Token Anda',
    //     data: { result },
    //   };
    // } catch (error) {
    //   return {
    //     status: 'failed',
    //     code: HttpStatus.INTERNAL_SERVER_ERROR,
    //     message: 'Token Anda',
    //     errorMessage: 'Sok Tau',
    //     data: { result: null },
    //   };
    // }
  }

  @Post('login')
  login(@Body() body: { name: string; password: string; site: string }) {
    const user = this.appService.validateUser(body.name, body.password);
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      token: this.appService.generateUserJWT(body.name, body.site),
    };
  }

  // Contoh dari sini
  @Post('/kurang')
  getKurang(@Body() body: { a: number; b: number }) {
    // Request
    const { a, b } = body;
    // pesan gagal request kosong
    if (a === undefined || b === null) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Kurang',
        data: { result: null },
      };
    }

    try {
      // Panggil
      const result = this.appService.getKurang(a, b);
      // pesan gagal result kosong atau null
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Kurang',
          errorMessage: 'Gak gitu',
          data: { result: null },
        };
      }
      // pesan success
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Kurang',
        data: { result }, // response sebenarnya result
      };
    } catch (error) {
      // pesan gagal lainnya yang belum di cover
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Kurang',
        errorMessage: 'Gak gitu',
        data: { result: null },
      };
    }
  }

  @Post('/perkalian')
  getPerkalian(@Body() body: { a: number; b: number }) {
    const { a, b } = body;
    if (a === undefined || b === null) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Kali',
        data: { result: null },
      };
    }

    try {
      const result = this.appService.getPerkalian(a, b);
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Kali',
          errorMessage: 'Gak gitu',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Kali',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Kali',
        errorMessage: 'Gak gitu',
        data: { result: null },
      };
    }
  }

  @Post('/pembagian')
  getPembagian(@Body() body: { a: number; b: number }) {
    const { a, b } = body;
    if (a === undefined || b === null) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Bagi',
        data: { result: null },
      };
    }

    try {
      const result = this.appService.getPembagian(a, b);
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Bagi',
          errorMessage: 'Gak gitu',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Done',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Bagi',
        errorMessage: 'Gak gitu',
        data: { result: null },
      };
    }
  }

  @Post('/pythagoras')
  getPythagoras(@Body() body: { a: number; b: number }) {
    const { a, b } = body;
    if (a === undefined || b === null) {
      return {
        status: 'failed',
        code: HttpStatus.BAD_REQUEST,
        message: 'Uncomplete',
        data: { result: null },
      };
    }

    try {
      const result = this.appService.getPythagoras(a, b);
      if (result === null || Number.isNaN(result) || result === undefined) {
        return {
          status: 'failed',
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Pythagoras',
          errorMessage: 'Uncomplete',
          data: { result: null },
        };
      }
      return {
        status: 'success',
        code: HttpStatus.OK,
        message: 'Done',
        data: { result },
      };
    } catch (error) {
      return {
        status: 'failed',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Pythagoras',
        errorMessage: 'Undetected',
        data: { result: null },
      };
    }
  }
}
