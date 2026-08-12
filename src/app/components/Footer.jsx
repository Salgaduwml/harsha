import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-center pt-14 pb-42">
      <p className="font-body text-sm text-rose/70">
        Developed with 💖 by{" "}
        <Link
          className="text-rose"
          href="https://www.malindalakshan.com/"
          target="_blank"
        >
          Malinda
        </Link>
      </p>
    </div>
  );
}
