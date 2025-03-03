/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app.controller.ts
import { Controller, Post, Body, HttpStatus, Query, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
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

  @Post('token')
  getToken(
    @Body()
    body: {
      userName: string;
      firstName: string;
      lastName: string;
      gender: string;
    },
  ) {
    const { userName, firstName, lastName, gender } = body;
    return {
      token: this.appService.generateUserJWT(
        userName,
        firstName,
        lastName,
        gender,
      ),
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
}
