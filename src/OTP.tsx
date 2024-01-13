import React, { useState } from 'react';
import { InputOTP } from 'antd-input-otp';
import { Button, message } from 'antd';

const InputOTPPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  const handleOtpChange = (otpValue: string[]) => {
    setOtp(otpValue);
  };

  const handleVerification = () => {
    const expectedOtp = '123456';

    if (otp.join('') === expectedOtp) {
      message.success('OTP Verified Successfully!');
    } else {
      message.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' ,textAlign : 'center' }}>
        <h1 style={{color: 'green'}}>One-Time Password</h1>

        <h3 >
        We have sent a One-Time Password confirmation code on your email.
        </h3>
        <h3 >
        Please enter the OTP below to confirm your email address and click submit to authorize this login.
        </h3>
      <InputOTP
        length={6}
        value={otp}
        onChange={handleOtpChange}
      />
      <Button  type="primary" onClick={handleVerification} style={{ marginTop: '10px', textAlign: 'center' }}>
        Verify OTP
      </Button>
    </div>
  );
};

export default InputOTPPage;
