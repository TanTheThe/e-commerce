"""update_address_order__3

Revision ID: a49869939971
Revises: 119864c268ff
Create Date: 2025-05-21 21:05:55.675047

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'a49869939971'
down_revision: Union[str, None] = '119864c268ff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('order', 'Address',
               existing_type=postgresql.JSONB(astext_type=sa.Text()),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('order', 'Address',
               existing_type=postgresql.JSONB(astext_type=sa.Text()),
               nullable=True)
    # ### end Alembic commands ###
