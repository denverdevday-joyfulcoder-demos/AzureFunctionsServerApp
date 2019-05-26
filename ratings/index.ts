import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const ratings: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    let rating = '';
    let score = +req.query.score;

    if (isNaN(score) && req.body && req.body.scores && req.body.scores.length) {
        let total = 0;
        (<Array<number>>req.body.scores).forEach(item => {
            total += +item;
        });
        score = total / req.body.scores.length;
    }

    if (score >= .7) {
        rating = 'good';
    } else if (score >= .3) {
        rating = 'bad';
    } else if (score >= 0) {
        rating = 'ugly';
    }

    if (rating) {
        context.res = {
            body: rating
        };
    } else {
        context.res = {
            status: 400,
            body: "Please provide a numeric score between 0 and 1"
        };
    }
};

export default ratings;
