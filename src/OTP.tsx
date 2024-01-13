import React, { useState } from 'react';
import { InputOTP } from 'antd-input-otp';
import { Button, message } from 'antd';

const App: React.FC = () => {
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
    <div style={{ padding: '20px' }}>
      <InputOTP
        length={6}
        value={otp}
        onChange={handleOtpChange}
      />
      <Button type="primary" onClick={handleVerification} style={{ marginTop: '10px' }}>
        Verify OTP
      </Button>
    </div>
  );
};

export default App;
