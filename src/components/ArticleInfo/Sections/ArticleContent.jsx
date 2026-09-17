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

function formatArabicDateShort(dateString) {
  let months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  let parts = dateString.split("-");
  let monthNumber = parseInt(parts[1], 10);
  let day = parseInt(parts[2], 10);

  let monthName = months[monthNumber - 1];
  let dayArabic = toArabicNumbers(day);

  return dayArabic + " " + monthName;
}

function contentToSections(content) {
  let blocks = content.split("\n\n");
  let intro = "";
  let sections = [];

  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];

    if (block.indexOf("## ") === 0) {
      let title = block.replace("## ", "");
      sections.push({
        id: "section-" + sections.length,
        title: title,
        paragraphs: [],
      });
    } else if (sections.length === 0) {
      intro = block;
    } else {
      let lastSection = sections[sections.length - 1];
      lastSection.paragraphs.push(block);
    }
  }

  return { intro: intro, sections: sections };
}

function ArticleContent(props) {
  let post = props.post;

  let parsedContent = contentToSections(post.content);
  let intro = parsedContent.intro;
  let sections = parsedContent.sections;
  let shortDate = formatArabicDateShort(post.date);

  let tagElements = [];
  for (let t = 0; t < post.tags.length; t++) {
    tagElements.push(
      <span
        key={t}
        className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer"
      >
        #{post.tags[t]}
      </span>,
    );
  }

  let sectionElements = [];
  for (let s = 0; s < sections.length; s++) {
    let section = sections[s];

    sectionElements.push(
      <h2
        key={section.id + "-title"}
        id={section.id}
        className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-24"
      >
        <span className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30">
          <i className="fa-solid fa-camera text-orange-500"></i>
        </span>
        {section.title}
      </h2>,
    );

    for (let p = 0; p < section.paragraphs.length; p++) {
      sectionElements.push(
        <p
          key={section.id + "-p-" + p}
          className="text-neutral-300 leading-relaxed mb-6 text-lg"
        >
          {section.paragraphs[p]}
        </p>,
      );
    }
  }

  let tocElements = [];
  for (let c = 0; c < sections.length; c++) {
    tocElements.push(
      <a
        key={sections[c].id}
        href={"#" + sections[c].id}
        className="flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-300 group"
      >
        <span className="flex items-center justify-center w-6 h-6 bg-[#1a1a1a] rounded-lg text-xs font-bold text-neutral-500 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
          {c + 1}
        </span>
        <span className="text-sm">{sections[c].title}</span>
      </a>,
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-[1fr_300px] gap-12">
        <div className="order-2 lg:order-1">
          <div className="p-6 bg-linear-to-r from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 mb-10">
            <p className="text-lg text-neutral-200 leading-relaxed italic">
              "{post.excerpt}"
            </p>
          </div>

          <div className="prose-custom">
            <p className="text-neutral-300 leading-relaxed mb-6 text-lg">
              {intro}
            </p>
            {sectionElements}
          </div>

          <div className="mt-14 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                <i className="fa-solid fa-tags text-orange-500"></i>
              </div>
              <h3 className="font-bold text-white">الوسوم</h3>
            </div>
            <div className="flex flex-wrap gap-2">{tagElements}</div>
          </div>

          <div className="mt-6 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <i className="fa-solid fa-share-nodes text-orange-500"></i>
                </div>
                <h3 className="font-bold text-white">شارك المقال</h3>
              </div>
              <div className="flex gap-2">
                <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#1da1f2] hover:text-white hover:border-transparent transition-all duration-300">
                  <i className="fa-brands fa-x-twitter"></i>
                </button>
                <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all duration-300">
                  <i className="fa-brands fa-linkedin-in"></i>
                </button>
                <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#25d366] hover:text-white hover:border-transparent transition-all duration-300">
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-orange-500 hover:text-white hover:border-transparent transition-all duration-300">
                  <i className="fa-solid fa-link"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-8 bg-linear-to-br from-[#161616] to-[#111111] rounded-2xl border border-[#262626]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                alt={post.author.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-orange-500/20"
                src={post.author.avatar}
              />
              <div className="text-center sm:text-right flex-1">
                <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider">
                  كاتب المقال
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {post.author.name}
                </h3>
                <p className="text-neutral-500 text-sm mb-3">
                  {post.author.role}
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  مصور محترف شغوف بمشاركة المعرفة والخبرات في عالم التصوير
                  الفوتوغرافي.
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <i className="fa-solid fa-list text-orange-500"></i>
                </div>
                <h3 className="font-bold text-white">محتويات المقال</h3>
              </div>
              <nav className="space-y-2">{tocElements}</nav>
            </div>

            <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                  <i className="fa-regular fa-clock text-orange-500 text-xl mb-2"></i>
                  <p className="text-white font-bold">{post.readTime}</p>
                  <p className="text-neutral-500 text-xs">وقت القراءة</p>
                </div>
                <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                  <i className="fa-regular fa-calendar text-orange-500 text-xl mb-2"></i>
                  <p className="text-white font-bold text-sm">{shortDate}</p>
                  <p className="text-neutral-500 text-xs">تاريخ النشر</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-linear-to-br from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20">
              <div className="text-center">
                <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-envelope text-orange-500 text-xl"></i>
                </div>
                <h3 className="font-bold text-white mb-2">لا تفوّت جديدنا</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  اشترك للحصول على أحدث المقالات
                </p>
                <a
                  className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-center"
                  href="/blog"
                >
                  تصفح المزيد
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ArticleContent;
