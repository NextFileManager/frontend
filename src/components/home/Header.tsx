import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <span className="ml-2 text-xl font-semibold text-gray-900">
          🚀 NextFileManager
        </span>

        <div className="flex items-center">
          <Button>Docs</Button>
        </div>
      </div>
    </header>
  );
}
