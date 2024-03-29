using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
                
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activty = await _context.Activities.FindAsync(request.Id);
                _context.Remove(activty);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}