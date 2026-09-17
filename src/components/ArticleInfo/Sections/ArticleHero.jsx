
function toArabicNumbers(number) {
  let arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  let numberString = number.toString();
  let result = "";

  for (let i = 0; i < numberString.length; i++) {
    let digit = numberString[i];
    result = result + arabicDigits[digit];
  }

  return result;
}


function formatArabicDate(dateString) {
  let months = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ];

  let parts = dateString.split("-");
  let year = parts[0];
  let monthNumber = parseInt(parts[1], 10);
  let day = parseInt(parts[2], 10);

  let monthName = months[monthNumber - 1];
  let dayArabic = toArabicNumbers(day);
  let yearArabic = toArabicNumbers(year);

  return dayArabic + " " + monthName + " " + yearArabic;
}

function ArticleHero(props) {
  let post = props.post;
  let arabicDate = formatArabicDate(post.date);

  return (
    <div className="relative h-[60vh] min-h-125 overflow-hidden">
      <img
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
        src={post.image}
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/30 to-transparent"></div>

      <div className="absolute top-8 right-8 left-8">
        <nav className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-sm border border-white/10">
          <a className="text-white/70 hover:text-white transition-colors" href="/">
            <i className="fa-solid fa-home"></i>
          </a>
          <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>
          <a className="text-white/70 hover:text-white transition-colors" href="/blog">
            المدونة
          </a>
          <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>
          <span className="text-orange-400 font-medium truncate max-w-50">
            {post.category}
          </span>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors"
              href={"/blog?category=" + post.category}
            >
              {post.category}
            </a>

            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <i className="fa-regular fa-calendar"></i>
                {arabicDate}
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-regular fa-clock"></i>
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
            <img
              alt={post.author.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/50"
              src={post.author.avatar}
            />
            <div>
              <p className="font-bold text-white">{post.author.name}</p>
              <p className="text-sm text-white/60">{post.author.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleHero;