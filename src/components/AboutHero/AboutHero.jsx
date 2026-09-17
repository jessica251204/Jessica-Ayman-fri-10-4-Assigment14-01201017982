import { siteInfo } from "../../data/posts"; 

const stats = [
  { icon: "fa-users", value: "+2مليون", label: "قارئ شهرياً" },
  { icon: "fa-newspaper", value: "+500", label: "مقالة منشورة" },
  { icon: "fa-pen-nib", value: "+50", label: "كاتب خبير" },
  { icon: "fa-book-open", value: "+15", label: "تصنيف" },
];

 function AboutHero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)] bg-size-[60px_60px]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="section-label inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          من نحن
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          مهمتنا هي <span className="gradient-text">الإعلام والإلهام</span>
        </h1>

        <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-12">
          {siteInfo.description} نحن شغوفون بمشاركة المعرفة ومساعدة المصورين
          على تنمية مهاراتهم من خلال محتوى عالي الجودة.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6">
              <i className={`fa-solid ${stat.icon} text-2xl text-orange-500 mb-2 block`}></i>
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutHero;