'use client';

export function SoundWave() {
    return (
        <div
            className="relative -top-8 left-1/2 -translate-x-1/2 w-[100%] h-24 opacity-30"
            style={{
                background:
                    'radial-gradient(50% 50% at 50% 50%, hsl(var(--primary)) 0%, rgba(219, 44, 44, 0) 100%)',
            }}
        >
            <svg
                className="w-full h-full text-primary"
                width="100%"
                height="100%"
                viewBox="0 0 1200 80"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g opacity="0.7" filter="url(#glow)">
                    <path
                        d="M0 40 
                           C 100 120, 100 -40, 200 40
                           S 300 120, 400 40
                           S 500 120, 600 40
                           S 700 120, 800 40
                           S 900 120, 1000 40
                           S 1100 120, 1200 40"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M0 40
                           C 100 -40, 100 120, 200 40
                           S 300 -40, 400 40
                           S 500 -40, 600 40
                           S 700 -40, 800 40
                           S 900 -40, 1000 40
                           S 1100 -40, 1200 40"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="1.5"
                    />
                </g>
            </svg>
        </div>
    );
}
