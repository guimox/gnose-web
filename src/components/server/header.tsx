export default function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <nav>
        <ul className="flex justify-center">
          <li className="list-none">
            <a
              href="#quotes"
              className="text-white text-lg font-semibold hover:text-gray-400"
            >
              Quotes
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
