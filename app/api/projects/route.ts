import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    // Create project with dummy userId
    const newProject = await prisma.project.create({
      data: {
        id: crypto.randomUUID(),
        name,
        projectKey: randomBytes(12).toString('hex'),
        userId: '4085baa0-e0e8-42ea-88f9-dc54a7aee607', // existing userId in your DB
      },
    });

    return NextResponse.json(newProject); // ✅ return the created project
  } catch (err) {
    console.error('Failed to create project', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
