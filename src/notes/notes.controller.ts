import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Request, response, Response } from 'express';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @Res() response: Response) {
    // return this.notesService.create(createNoteDto);
    try{
      const notes = await this.notesService.create(createNoteDto);
      return response.status(200).json({
        status: 200,
        message: 'Note created successfully',
        data: notes
      });
    }catch (err) {
      return response.status(500).json({
        status: 500,
        message: 'Error creating note',
        error: err.message
      });
    }
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
