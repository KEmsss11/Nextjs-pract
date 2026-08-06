import Image from "next/image";


export default function Page() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Image src="/profile.png" alt="Profile Logo" width={24} height={24} />
    </div>
  );
}
