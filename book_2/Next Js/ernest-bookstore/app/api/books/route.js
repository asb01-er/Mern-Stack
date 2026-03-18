import { NextResponse } from 'next/server';
import { prisma } from "../../db";

export async function GET(req) {
  const books = await prisma.book.findMany();
  console.log('GET books called');
  return NextResponse.json(books);
}

export async function POST(req) {
  const { title, link, img } = await req.json();
  await prisma.book.create({
    data: {
      title: title,
      link: link,
      img: img
    }
  })
  return NextResponse.json('Book added successfully');
}