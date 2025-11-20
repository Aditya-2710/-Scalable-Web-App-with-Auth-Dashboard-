import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/50">
        <div className="container flex flex-col items-center gap-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            v1.0 Released
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl max-w-3xl">
            Build Scalable Web Apps with <span className="text-primary">Speed</span> and <span className="text-primary">Security</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A production-ready template featuring Authentication, Dashboard, CRUD operations, and a modern UI stack.
          </p>
          <div className="flex gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com" target="_blank">
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-24 lg:py-32">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="p-2 w-fit rounded-md bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Secure Authentication</h3>
            <p className="text-muted-foreground">
              JWT-based authentication with HttpOnly cookies and protected routes ensures your data stays safe.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="p-2 w-fit rounded-md bg-primary/10 text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Fast Performance</h3>
            <p className="text-muted-foreground">
              Built with Next.js 14 and optimized for speed, ensuring a snappy user experience.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="p-2 w-fit rounded-md bg-primary/10 text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Scalable Architecture</h3>
            <p className="text-muted-foreground">
              Designed with modularity in mind, making it easy to extend and maintain as your app grows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
