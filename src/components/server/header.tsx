export default function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <nav>
        <ul className="flex justify-center">
          <li className="list-none">
            <a
              href="#quotes"
              className="text-lg font-semibold text-white hover:text-gray-400"
            >
              Quotes
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
