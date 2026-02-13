import { NextResponse } from "next/server";

const events = [
    {
        id: 1,
        title: "Uni2unicorn",
        description: "Bid. Build. Pivot. Pitch. A fast-paced entrepreneurial battlefield where campus locations turn into powerful startup ideas.",
        time: "February 6, 6:00 PM",
        location: "LT202",
        imageUrl: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770963152/IMG_1379_wgp3ha.jpg" 
    },
    {
        id: 2,
        title: "Boardroom ",
        description: "Innovate, market, survive crises, and scale your startup in this high-stakes business simulation.",
        time: "February 13, 9:00 PM",
        location: "Activity Space ",
        imageUrl: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770976174/40d7def4-7d81-4ba2-9b3b-5b93161c945a.png" 
       
    },
    {
        id: 3,
        title: "Opening Ceremony",
        description: "An inspiring inauguration marking the beginning of E-Summit with a distinguished keynote address.",
        time: "February 18, 6:00 PM",
        location: "Main Auditorium",
        imageUrl: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770964313/_DSC0013_1_tt4yqq.jpg" 
        // speaker: "Various",
    },
    {
        id: 4,
        title: "Internship Fair",
        description: "Connecting students with recruiters and startups to unlock internships and real-world opportunities.",
        time: "February 19, 3:00 PM",
        location: "K lawns",
        imageUrl: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770978727/DSC_0726_ka7sn6.jpg" 
        // speaker: "VC Panel",
    },
    {
        id: 5,
        title: "Startup showcase ",
        description: "A vibrant platform connecting startups and students to explore innovation, emerging trends, and hands-on entrepreneurship.",
        time: "February 20, 10:00 AM",
        location: "Workshop Room B",
        imageUrl: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770978742/IMG_2681_usoleh.jpg" 
        // speaker: "Jane Smith",
    },
    {
        id: 6,
        title: "Biz Conclave",
        description: "A formal conclave bringing together industry leaders to share insights across business, entrepreneurship, finance, and technology.",
        time: "February 21, 5:00 PM",
        location: "Main Auditorium",
        imageUrl: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770974307/_DSC0035_ayfrjy.jpg" 
        // speaker: "E-Summit Team",
    },
    {
        id: 7,
        title: "Unwind",
        description: "An unforgettable evening where ideas, creativity, and connections come alive.",
        time: "February 22, 5:30 PM",
        location: "OAT",
        imageUrl: "https://res.cloudinary.com/dgwll3dwe/image/upload/v1770963160/IMG_1574_ukksxc.jpg" 
        
    },
];

export async function GET() {
    return NextResponse.json(events);
}
