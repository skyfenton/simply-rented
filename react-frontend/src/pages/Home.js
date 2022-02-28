export default function Home() {
  const handleSearch = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container position-relative">
        <h1>
          <i>Home</i>
        </h1>
        <form
          class="input-group row mt-5 justify-content-md-center gx-0"
          onSubmit={handleSearch}
        >
          <div class="w-50">
            <input
              type="text"
              id="form1"
              className="form-control form-control-lg"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <button type="button" class="btn btn-primary col-1">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>
    </>
  );
}
