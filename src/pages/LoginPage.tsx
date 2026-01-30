export default function LoginPage() {
  return (
    <div>
      <form className="grid gap-6">
        <div>
          <label htmlFor="">Email</label>
          <input type="text" className="border px-3 py-1.5 w-full" />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input type="password" className="border px-3 py-1.5 w-full" />
        </div>

        <div>
          <button className="bg-green-500 px-4 py-2 w-full">Login</button>
        </div>
      </form>
    </div>
  );
}
