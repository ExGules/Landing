"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Button = ({ children, className = "", ...props }) => (
  <button className={`px-6 py-3 rounded-2xl font-medium ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-3xl border ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Input = (props) => (
  <input {...props} className={`w-full px-4 py-3 rounded-xl ${props.className || ""}`} />
);

const Textarea = (props) => (
  <textarea {...props} className={`w-full px-4 py-3 rounded-xl ${props.className || ""}`} />
);

export default function Landing2026() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [open, setOpen] = useState(false);
  const [viewers, setViewers] = useState(12);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((v) => Math.max(8, v + (Math.floor(Math.random() * 3) - 1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      setTime(midnight - now);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const h = Math.floor(time / (1000 * 60 * 60));
    const m = Math.floor((time / (1000 * 60)) % 60);
    const s = Math.floor((time / 1000) % 60);
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Заявка с сайта:%0AИмя: ${form.name}%0AКонтакт: ${form.contact}%0AСообщение: ${form.message}`;
    window.open(`https://t.me/NSKras?text=${text}`, "_blank");
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* cursor glow */}
      <motion.div
        animate={{ x: mouse.x - 200, y: mouse.y - 200 }}
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full"
      />

      {/* background glow */}
      <motion.div
        style={{ y: y1 }}
        className="absolute w-[600px] h-[600px] bg-purple-600/30 blur-[140px] rounded-full -top-40 -left-40"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute w-[600px] h-[600px] bg-blue-600/30 blur-[140px] rounded-full -bottom-40 -right-40"
      />

      {/* header */}
      <header className="flex justify-between items-center px-6 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.7)]">
            <span className="font-bold">N</span>
          </div>

          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]">
            NSKras
          </div>
        </div>
      </header>

      {/* viewers */}
      <div className="fixed bottom-6 left-6 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
        Сейчас смотрят: {viewers}
      </div>

      {/* timer */}
      <div className="fixed top-6 right-6 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
        Скидка сегодня: {formatTime()}
      </div>

      {/* HERO */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Создам продающий сайт
          <br /> за 48 часов
        </h1>

        <p className="mt-6 text-xl text-white/70 max-w-xl">
          Лендинг под ключ для бизнеса. Дизайн, текст, запуск. Получайте заявки уже через 2 дня.
        </p>

        <div className="mt-8 flex gap-4">
          <Button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500"
          >
            Получить сайт
          </Button>

          <a href="https://t.me/NSKras" target="_blank">
            <Button className="bg-white/10">Написать в Telegram</Button>
          </a>
        </div>
      </section>

      {/* features */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
        {[
          "Продающий дизайн",
          "Высокая конверсия",
          "48 часов запуск",
          "SEO оптимизация",
          "Адаптив под мобильные",
          "Под ключ",
        ].map((t, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05, rotateX: 3, rotateY: -3 }}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8 text-xl">{t}</CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* portfolio devices */}
      <section className="px-6 py-24 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Примеры работ NSKras</h2>

        <div className="relative flex justify-center items-center">
          {/* laptop */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative w-[600px] h-[360px] bg-black rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />

            <div className="p-4 space-y-2">
              <div className="h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-24 bg-white/10 rounded" />
                <div className="h-24 bg-white/10 rounded" />
                <div className="h-24 bg-white/10 rounded" />
              </div>
              <div className="h-20 bg-white/10 rounded" />
            </div>
          </motion.div>

          {/* phone */}
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -left-10 bottom-0 w-[140px] h-[260px] bg-black rounded-[28px] border border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="p-2 space-y-2">
              <div className="h-6 bg-purple-500/40 rounded" />
              <div className="h-16 bg-white/10 rounded" />
              <div className="h-8 bg-blue-500/40 rounded" />
            </div>
          </motion.div>

          {/* tablet */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-10 bottom-0 w-[260px] h-[200px] bg-black rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="p-3 space-y-2">
              <div className="h-8 bg-blue-500/40 rounded" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 bg-white/10 rounded" />
                <div className="h-16 bg-white/10 rounded" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* reviews */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">Отзывы клиентов</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Получил 14 заявок за первый день. Сайт окупился сразу.",
            "Очень быстро сделали лендинг. Клиенты начали писать в тот же день.",
            "Конверсия выросла в 3 раза. Рекомендую NSKras.",
          ].map((text, i) => (
            <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="text-white/80">{text}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 text-center">
        <h2 className="text-5xl font-bold">Готовы получить клиентов?</h2>

        <Button
          onClick={() => setOpen(true)}
          className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Заказать сайт
        </Button>
      </section>

      {/* popup */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <motion.div className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl w-[420px] relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-4">Оставить заявку</h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white/5"
                />

                <Input
                  placeholder="Telegram или WhatsApp"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="bg-white/5"
                />

                <Textarea
                  placeholder="Кратко о проекте"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-white/5"
                />

                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                  Отправить заявку
                </Button>

                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full bg-white/10"
                >
                  Закрыть
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
