import { useState } from "react";

type Props = {
  title: string;
  buttonLabel: string;
  onSubmit: (password: string) => void;
};

function PasswordForm({ title, buttonLabel, onSubmit }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim()) setError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      return;
    }
    onSubmit(password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white-100 p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block mb-1 text-sm font-medium">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="비밀번호 입력"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">비밀번호를 입력해주세요.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-200 text-black-100 font-semibold py-2 rounded hover:bg-green-300">
              {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PasswordForm;