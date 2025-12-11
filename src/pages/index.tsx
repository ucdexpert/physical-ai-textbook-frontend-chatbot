import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';


const modules = [
  { title: 'What is Physical AI?', link: '/docs/chapters/what-is-physical-ai', desc: '' },
  { title: 'Humanoid Robotics Foundations', link: '/docs/chapters/humanoid-robotics-foundations', desc: '' },
  { title: 'Sensors and Perception', link: '/docs/chapters/sensors-and-perception', desc: '' },
  { title: 'ROS 2 Fundamentals', link: '/docs/chapters/ros-2-fundamentals', desc: '' },
  { title: 'Simulation Environments', link: '/docs/chapters/gazebo-and-unity-simulation', desc: '' },
  { title: 'NVIDIA Isaac Platform', link: '/docs/chapters/nvidia-isaac-sim-and-isaac-ros', desc: '' },
  { title: 'Advanced Robotics Concepts', link: '/docs/chapters/vision-language-action-robotics', desc: '' },
];

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroBackground} aria-hidden>
        <div className="bg-wave" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
          <Heading as="h1" className={clsx(styles.heroTitle, 'futura-headline', 'glow-text')}>
            Physical AI & Humanoid Robotics
          </Heading>
          <p className={styles.heroSubtitle}>
            A premium, hands-on textbook for embodied intelligence — Sim2Real, agentic systems, and
            production-grade robotics design.
          </p>
          <div className={styles.buttons}>
            <Link className={clsx('button', styles.heroButton)} to="/docs/intro">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ModulePreview() {
  return (
    <section className={styles.modules}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.modulesTitle)}>
          Explore the Modules
        </Heading>
        <div className={styles.moduleGrid}>
          {modules.map((module, idx) => (
            <Link key={idx} to={module.link} className={styles.moduleCard}>
              <h4>{module.title}</h4>
              <p>{module.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="A comprehensive guide to embodied intelligence, Sim2Real transfer, and autonomous agents.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <ModulePreview />
      </main>

    </Layout>
  );
}

