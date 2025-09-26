function InfoWebsite() {
  return (
    <div className="bg-yellow-100 text-yellow-900 text-lg max-xs:text-sm flex max-md:flex-col items-center justify-center gap-2 p-4">
      <span className="text-center">
        ⚠️ All mutations are deactivated to prevent data corruption.
      </span>
      <a
        href="https://github.com/mostafahamedbesher/Dashboard-for-Ecommerce-Clothes-Store"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600 hover:text-blue-800"
      >
        Watch demo
      </a>
    </div>
  );
}

export default InfoWebsite;
