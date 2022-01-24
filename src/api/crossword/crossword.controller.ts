import { CrosswordService } from "./crossword.service";
import { Express, Request, Response } from "express";

export class UserController {
  public listen(server: Express) {
    server.get("/crosswords", this.readAll);
    server.get("/crossword/:id", this.read);
    server.post("/crossword", this.create);
    server.post("/crossword/update/:id", this.update);
    server.delete("/crossword/delete/:id", this.delete);
  }

  private async readAll(req: Request, res: Response) {
    const crosswords = await CrosswordService.readAll();
    res.send(crosswords);
  }

  private async read(req: Request, res: Response) {
    const { id } = req.params;
    const crossword = await CrosswordService.read(id);
    res.send(crossword);
  }

  private async create(req: Request, res: Response) {
    const { crosswordname } = req.body;
    const createdUser = await CrosswordService.create(crosswordname);
    res.send(createdUser);
  }

  private async update(req: Request, res: Response) {
    const { id } = req.params;
    const { crossword } = req.body;
    const updatedUser = await CrosswordService.update(id, crossword);
    res.send(updatedUser);
  }

  private async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await CrosswordService.delete(id);
    res.send(deletedUser);
  }
}
