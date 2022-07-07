export class LinkedLineController {
    constructor({ writeLinkedLineUseCase }) {
        this.writeLinkedLineUseCase = writeLinkedLineUseCase;
        this.write = this.write.bind(this)
    }

    async write(req, res) {
        const { message } = req.body;
        if (!message || message === "") {
            return res.status(400).json({
                type: 'BadRequest',
                message: 'empty or non message'
            });
        }
        try {
            const request = { message };
            const response = await this.writeLinkedLineUseCase.execute(request);
            return res.status(201).send(response);
        } catch(err) {
            return res.status(500).json({
                type: 'InternalServerError',
                message: 'couldn\'t writing a linked line'
            });
        }
    }
}