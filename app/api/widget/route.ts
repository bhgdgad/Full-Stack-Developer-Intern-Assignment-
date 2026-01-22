import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { projectKey, message } = await req.json();

    if (!projectKey || !message) {
      return NextResponse.json({ error: 'Missing projectKey or message' }, { status: 400 });
    }

    // Find project
    const project = await prisma.project.findUnique({ where: { projectKey } });
    if (!project) return NextResponse.json({ error: 'Invalid projectKey' }, { status: 404 });

    // Save feedback
    await prisma.feedback.create({
      data: { projectId: project.id, message },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Enable CORS for the widget (any domain)
export const config = {
  api: { bodyParser: true },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
};
