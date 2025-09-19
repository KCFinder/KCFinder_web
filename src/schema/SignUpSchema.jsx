// src/schema/SignUpSchema.js
import { z } from 'zod';

export const SignUpSchema = z
  .object({
    userId: z
      .string()
      .min(4, { message: '4자 이상이어야 합니다' })
      .max(20, { message: '20자 이하여야 합니다' })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: '특수문자, 공백 없이 입력해주세요',
      }),
    userPassword: z
      .string()
      .min(8, { message: '8자 이상이어야 합니다' })
      .max(20, { message: '20자 이하여야 합니다' })
      .regex(
        /^(?![a-z]+$)(?![A-Z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]+$/,
        {
          message: '영문 대소문자, 숫자, 특수문자 중 2가지 이상 포함',
        },
      ),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력하세요' }),
    userEmail: z.string().email({ message: '이메일 형식이 올바르지 않습니다' }),
    userPhone: z.string().regex(/^010[0-9]{8}$/, {
      message: '전화번호는 010으로 시작하는 11자리 숫자',
    }),
  })
  .refine(data => data.userPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다',
  });
