import { Link } from "react-router";
import {
  ArrowRightIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NAVBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto py-3 px-4 flex items-center justify-between">
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>

            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
              CodeNova
            </span>
          </Link>

          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">
              <span className="text-base-content">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                CodeNova
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews—bringing together live coding, video communication, and real-time teamwork in one seamless experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg hover:scale-105 transition-all duration-300">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>
            </div>
          </div>

          <img
            src="/hero.png"
            alt="CodeNova Platform"
            className="w-[90%] mx-auto h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-4 py-14 flex-1">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary font-mono">
              Succeed
            </span>
          </h2>

          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless
            and productive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>

              <h3 className="card-title">HD Video Call</h3>

              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during
                interviews.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>

              <h3 className="card-title">Live Code Editor</h3>

              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple
                language support.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>

              <h3 className="card-title">Easy Collaboration</h3>

              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other
                in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="pb-8 text-center text-sm text-base-content/50">
        <p>Created by Soham Mondal</p>

        <p>
          For any query contact{" "}
          <a
            href="mailto:sohammondal29@gmail.com"
            className="text-primary hover:underline"
          >
            sohammondal29@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
